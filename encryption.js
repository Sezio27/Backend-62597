import kbpgp from 'kbpgp';

// Define the function as async internally
async function encryptString(str, pbKey) {
  try {
    const keyManager = await new Promise((resolve, reject) => {
      kbpgp.KeyManager.import_from_armored_pgp({ armored: pbKey }, function(err, manager) {
        if (err) reject(err);
        else resolve(manager);
      });
    });

    if (!keyManager.is_pgp_public()) {
      throw new Error("Provided key is not a public key");
    }

    return await new Promise((resolve, reject) => {
      kbpgp.box({ msg: str, encrypt_for: keyManager }, function(err, result_string, result_buffer) {
        if (err) reject(err);
        else resolve(result_string);
      });
    });
  } catch (error) {
    // Handle error or rethrow as appropriate
    console.error("Encryption error:", error);
    return null; // return null or handle as needed
  }
}
export default encryptString
