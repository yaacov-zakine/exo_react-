// Pure helper that checks primality up to √n to avoid unnecessary iterations.
export const isPrimeNumber = (value) => {
  if (value === null || value === undefined) return false;
  if (value < 2 || !Number.isInteger(value)) return false;
  if (value === 2) return true;
  if (value % 2 === 0) return false;

  const limit = Math.floor(Math.sqrt(value));
  for (let i = 3; i <= limit; i += 2) {
    if (value % i === 0) {
      return false;
    }
  }
  return true;
};
