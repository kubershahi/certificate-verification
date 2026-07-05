# Upload and verification logic

## One batch = many certificates

- **Name** = Issuer/organization (e.g. "Ashoka University"). Stored in the DB with the batch.
- **Batch** = Identifier for a **group** of certificates (e.g. "2024", "CS-Graduates-2023"). One batch can contain many people.
- **JSON file** = The list of **all** certificates in that batch. Each entry is one person: `{ email, hash }` (hash = SHA3-256 of their PDF). So one upload = one batch = many certificates.

The upload form is not “one person” — it’s “one batch of many people.” You fill name + batch once and attach the JSON that contains everyone in that batch.

---

## Upload flow

1. **You (issuer)** run the hashing script: put all PDFs in `hashing/certificates/`, run `python script.py` → get `data.json` with `[ { email, hash, proof: [] }, ... ]`.
2. **Upload page:**  
   - **Name** = e.g. "Ashoka University"  
   - **Batch** = e.g. "2024"  
   - **Certificate file** = `data.json` (the whole batch).
3. **App:** Builds a Merkle tree from all `hash` values in the JSON, computes the root, fills in `proof` for each entry.
4. **Backend:** Saves one MongoDB record: `{ name, batch, certificate: [all entries with proofs], merkleRoot }`.
5. **Blockchain:** Calls `Certificate.addRoot(batch, merkleRoot)` so the root for this batch is stored on-chain (keyed by `batch`).

So: **one DB record per batch**, and **one on-chain root per batch**.

---

## Verify flow

1. **Holder** has their PDF and knows which **name** and **batch** it belongs to (e.g. "Ashoka University", "2024").
2. **Verify page:**  
   - **Name** = same as at upload (e.g. "Ashoka University")  
   - **Batch** = same as at upload (e.g. "2024")  
   - **PDF** = their certificate file.
3. **App:** Hashes the PDF (SHA3-256) → `fileHash`. Fetches the batch from the backend by `name` + `batch` (the record that has the full `certificate` array and `merkleRoot`).
4. **Matching:** Finds the entry in that batch where `certificates[i].hash === fileHash` and takes that entry’s `proof`.
5. **On-chain:** Gets the Merkle root for this batch from the contract: `getRoot(batch)`.
6. **Check:** Runs `verifyProof(fileHash, root, proof)`. If it returns true, the PDF is in the batch and the root matches the blockchain → **verified**.

So verification is: “Does this PDF’s hash appear in this batch’s Merkle tree, and does that tree’s root match the one on-chain?”

---

## Summary

| Concept    | Meaning |
|-----------|---------|
| **Name**  | Issuer (e.g. university name). |
| **Batch** | Id for a group of certificates (e.g. graduation year). One batch = one Merkle tree = one on-chain root. |
| **JSON**  | All certificates in that batch (many people, each with email + hash). |
| **Upload**| One form submit = one batch (many certificates) stored in DB and one root stored on-chain. |
| **Verify**| One person: they give name + batch + their PDF; system checks their hash is in that batch and proof matches the on-chain root. |
