module.exports = {
  formatData: (data) => {
    const header = data.splice(0, 1);
    const formattedHeader = header[0].map(h => h.trim());
    const formattedRows = data.map((row) => {
      const formattedRow = {};
      for (let i = 0; i < formattedHeader.length; i += 1) {
        formattedRow[formattedHeader[i]] = row[i].trim();
      }
      return formattedRow;
    });
    return {
      header: formattedHeader,
      rows: formattedRows,
    };
  },
};
