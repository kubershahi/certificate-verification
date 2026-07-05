# Merkle tree example: 5 certificates

## 1. The 5 certificates (input)

After the hashing script, you have something like:

```json
[
  { "email": "alice@uni.edu",   "hash": "0xaa...", "proof": [] },
  { "email": "bob@uni.edu",     "hash": "0xbb...", "proof": [] },
  { "email": "carol@uni.edu",   "hash": "0xcc...", "proof": [] },
  { "email": "dave@uni.edu",    "hash": "0xdd...", "proof": [] },
  { "email": "eve@uni.edu",     "hash": "0xee...", "proof": [] }
]
```

Call the hashes **H1, H2, H3, H4, H5** (one per certificate). These are the **leaves** of the Merkle tree.

---

## 2. How the tree is built (conceptually)

A Merkle tree hashes pairs of nodes until one value is left: the **root**.

- **Leaves (level 0):** H1, H2, H3, H4, H5  
- **Level 1:** hash(H1+H2)=H12, hash(H3+H4)=H34, and H5 is **duplicated** so we have a pair: hash(H5+H5)=H55  
- **Level 2:** hash(H12+H34)=H1234, and H55 is duplicated: hash(H55+H55)=H5555  
- **Level 3 (root):** hash(H1234+H5555)=**ROOT**

```
                    ROOT
                   /    \
              H1234      H5555
              /   \       /   \
          H12     H34   H55   H55
          / \     / \    |     |
         H1  H2  H3  H4  H5    H5
         ↑   ↑   ↑   ↑   ↑
       alice bob carol dave eve
```

(With 5 leaves, the library typically duplicates the last leaf so every level has pairs.)

---

## 3. What gets stored

**On-chain (contract):**  
Only the **ROOT** for this batch, e.g. `addRoot("2024", ROOT)`.

**In MongoDB:**  
One record per batch, e.g.:

```json
{
  "name": "Ashoka University",
  "batch": "2024",
  "merkleRoot": "0xROOT...",
  "certificate": [
    { "email": "alice@uni.edu", "hash": "0xaa...", "proof": [<siblings for H1>] },
    { "email": "bob@uni.edu",   "hash": "0xbb...", "proof": [<siblings for H2>] },
    ...
  ]
}
```

Each `proof` is the list of **sibling hashes** needed to recompute the root from that leaf (e.g. for H1: H2, then H34, then H5555).

---

## 4. Flow in the app

### Upload (issuer, once per batch)

1. You have 5 PDFs → script produces 5 entries with `email` + `hash`, `proof: []`.
2. On **Upload** you enter **Name** (e.g. "Ashoka University"), **Batch** (e.g. "2024"), and select this JSON.
3. App builds the Merkle tree from the 5 hashes (order can be reversed as in the code), gets **ROOT**, and fills **proof** for each of the 5 entries.
4. Backend saves: `{ name, batch, certificate: [all 5 with proofs], merkleRoot }`.
5. Contract: `addRoot("2024", ROOT)` so the root is stored on-chain for batch "2024".

Result: one batch = one root on-chain, one DB record with 5 certificates and 5 proofs.

---

### Verify (one holder, e.g. Carol)

1. Carol has her PDF and knows: Name = "Ashoka University", Batch = "2024".
2. On **Verify** she enters **Name** and **Batch**, and uploads **her PDF**.
3. App hashes the PDF → gets **H3** (Carol’s hash).
4. Backend returns the batch record for name + batch. The app finds the entry where `hash === H3` → that entry has **proof** for H3.
5. Contract: `getRoot("2024")` → returns **ROOT**.
6. App runs **verifyProof(H3, ROOT, proof)**:
   - Uses H3 and the first sibling from proof → hash them → get parent.
   - Uses that and the next sibling → hash → next level.
   - Repeats until one value is left.
   - If that value equals **ROOT**, the proof is valid.

So: **one leaf (one certificate)** is verified by showing it belongs to the tree whose root is on-chain.

---

## 5. Why Merkle tree?

- **On-chain:** Only one value per batch (the root) is stored. Cheap and fixed size.
- **Off-chain:** You store the full list and a small proof per certificate (log₂(n) hashes).
- **Verification:** Anyone with a PDF can prove “my hash is in this batch” by providing the hash + proof; the verifier checks it against the on-chain root. No need to trust the DB for the root; the blockchain is the source of truth for the root.

---

## 6. What `left`, `right`, and `parent` mean in a proof

Each proof step is one level of the tree. The library stores for that step:

- **left**  = left child (one of the two hashes being combined)
- **right** = right child (the other hash)
- **parent** = hash(left + right), i.e. the node one level up

So **parent = hash(left ‖ right)** (concatenate then hash). The verifier uses the leaf and these steps to walk up to the root.

---

## 7. Reconstruction example (0th certificate – user4)

Real data from your MongoDB for the **0th** certificate (user4@alumni.ashoka.edu.in):

**Leaf (user4’s hash):**
```text
8317b3149bf1c8880e8dc9b2671e329c0c30722032345eee25a9d11b9f53336f
```

**Proof (3 steps = 3 levels from leaf to root):**

| Step | left | right | parent |
|------|------|--------|--------|
| 0 | `c4af8f8ba1d0...` (sibling leaf) | `8317b3149bf1...` **(our leaf)** | `f8783a6b2134...` |
| 1 | `f8783a6b2134...` **(from step 0)** | `996cf761bf73...` (sibling) | `a19c199a4436...` |
| 2 | `a19c199a4436...` **(from step 1)** | `aac0d0593153...` (sibling) | `6b696f7a7789...` **= ROOT** |

**Reconstruction (how verification works):**

1. **Start:** current = leaf = `8317b314...`
2. **Step 0:** You have the leaf. Proof says: left = `c4af8f8b...`, right = `8317b314...` (leaf), parent = `f8783a6b...`.  
   So **parent = hash(left ‖ right)**. The verifier computes `hash(c4af8f8b... ‖ 8317b314...)` and checks it equals `f8783a6b...`.  
   Then set **current = f8783a6b...** (we’ve moved one level up).
3. **Step 1:** current = `f8783a6b...`. Proof: left = `f8783a6b...`, right = `996cf761...`, parent = `a19c199a...`.  
   Check **hash(f8783a6b... ‖ 996cf761...) === a19c199a...**.  
   Set **current = a19c199a...**.
4. **Step 2:** current = `a19c199a...`. Proof: left = `a19c199a...`, right = `aac0d059...`, parent = `6b696f7a...`.  
   Check **hash(a19c199a... ‖ aac0d059...) === 6b696f7a...**.  
   Set **current = 6b696f7a...** → this is the **ROOT**.

**Verification:** The on-chain root for batch `"UG24"` must equal `6b696f7a778975f6ef3da091cc85cd7f8cc81057fd174edb0679a41c8159262c`. If it does, user4’s certificate is in the tree and the proof is valid.

So for the **0th object**: the leaf is **right** in step 0 (sibling is **left**); then you always replace “your” current node with **parent** and use the next step’s sibling until you get the root.

---

## 8. Quick reference (5 certs)

| Step        | Who    | What happens |
|------------|--------|----------------|
| Hash PDFs  | Issuer | Script → 5 hashes (H1…H5) in JSON. |
| Build tree | App    | Leaves = H1…H5 → one ROOT, 5 proofs. |
| Save       | App    | DB: batch + 5 certs (each with proof). Chain: ROOT for batch. |
| Verify     | Holder | Hash PDF → get leaf. Get batch from DB, get that leaf’s proof. Get ROOT from chain. Recompute root from leaf + proof; if it matches chain, verified. |
