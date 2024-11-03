/**
 * Format response untuk API
 * @param {Object} data - Data yang ingin dikembalikan dalam respons
 * @param {string} message - Pesan tambahan (opsional)
 * @param {number} status - Kode status HTTP (default: 200)
 * @returns {Object} - Objek format respons
 */
const responseFormatter = (data, message = null, status = 200) => {
  return {
    status,
    message,
    data,
  };
};

module.exports = responseFormatter;
