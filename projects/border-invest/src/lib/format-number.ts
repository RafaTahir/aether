const compactCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const detailedCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCompactCurrency(value: number | null) {
  return isFiniteNumber(value)
    ? compactCurrency.format(normalizeZero(value))
    : "--";
}

export function formatDetailedCurrency(value: number | null) {
  return isFiniteNumber(value)
    ? detailedCurrency.format(normalizeZero(value))
    : "--";
}

export function formatPercent(value: number | null) {
  return isFiniteNumber(value)
    ? percent.format(normalizeZero(value) / 100)
    : "--";
}

function isFiniteNumber(value: number | null): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeZero(value: number) {
  return Object.is(value, -0) ? 0 : value;
}
