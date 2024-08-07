const displayINRCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 2,
  });

  return formatter.format(num);
};

export default displayINRCurrency;
