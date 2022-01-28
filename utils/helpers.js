module.exports = {
  format_type: (type) => {
    if (type) {
      return type[0].toUpperCase() + type.substring(1);
    } else {
      return "";
    }

  }
}