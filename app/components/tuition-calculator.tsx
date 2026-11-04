'use client';

import { useState } from 'react';

type TuitionProgram = {
  year: string;
  title: string;
  subtitle: string;
  tuition: string;
  downPayment: string;
};

const MATRICULATION = 110;
const BOOKS = 250;
const SHIPPING = 15;

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function parseAmount(value: string, field: string, program: string) {
  const amount = Number(value);
  if (!Number.isSafeInteger(amount) || amount < 0) {
    throw new Error(`Invalid ${field} amount for tuition program "${program}".`);
  }
  return amount;
}

export default function TuitionCalculator({
  programs,
  term12Label,
  term18Label,
  monthlyLabel,
  downPaymentLabel,
  matriculationLabel,
  tuitionLabel,
  booksLabel,
  shippingLabel,
  totalLabel,
}: {
  programs: readonly TuitionProgram[];
  term12Label: string;
  term18Label: string;
  monthlyLabel: string;
  downPaymentLabel: string;
  matriculationLabel: string;
  tuitionLabel: string;
  booksLabel: string;
  shippingLabel: string;
  totalLabel: string;
}) {
  const [term, setTerm] = useState<12 | 18>(18);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [downPayment, setDownPayment] = useState(() => {
    const firstProgram = programs[0];
    return firstProgram ? parseAmount(firstProgram.downPayment, downPaymentLabel, firstProgram.title) : 0;
  });
  const program = programs[selectedIndex];

  if (!program) {
    return <p className="tuition-empty-state">Tuition program information is not available.</p>;
  }

  const tuition = parseAmount(program.tuition, tuitionLabel, program.title);
  const total = tuition + MATRICULATION + BOOKS + SHIPPING;
  const monthly = Math.ceil(Math.max(0, total - downPayment) / term);

  function selectProgram(index: number) {
    const nextProgram = programs[index];
    if (!nextProgram) return;
    setSelectedIndex(index);
    setDownPayment(parseAmount(nextProgram.downPayment, downPaymentLabel, nextProgram.title));
  }

  return (
    <div className="tuition-calculator">
      <div className="tuition-calculator-heading">
        <div>
          <span className="card-index">{program.year} · {selectedIndex + 1} / {programs.length}</span>
          <h3>{program.title}</h3>
          {program.subtitle && <p>{program.subtitle}</p>}
        </div>
        <div className="tuition-price-preview" aria-live="polite">
          <span>{tuitionLabel}</span>
          <strong>{currency.format(tuition)}</strong>
        </div>
      </div>
      <div aria-label="Filter by degree" className="tuition-degree-filters" role="group">
        {programs.map((option, index) => (
          <button
            aria-pressed={selectedIndex === index}
            className="tuition-degree-filter"
            key={`${option.year}-${option.title}`}
            onClick={() => selectProgram(index)}
            type="button"
          >
            <span>{option.year}</span>
            <strong>{option.title}</strong>
          </button>
        ))}
      </div>
      <div className="tuition-slider-control">
        <div className="tuition-slider-label">
          <label htmlFor="tuition-down-payment">Adjust your down payment</label>
          <output htmlFor="tuition-down-payment">{currency.format(downPayment)}</output>
        </div>
        <input
          id="tuition-down-payment"
          type="range"
          min={0}
          max={total}
          step={25}
          value={Math.min(downPayment, total)}
          aria-valuetext={currency.format(downPayment)}
          onChange={(event) => setDownPayment(Number(event.currentTarget.value))}
        />
        <div className="tuition-slider-endpoints" aria-hidden="true">
          <span>{currency.format(0)}</span>
          <span>{currency.format(total)}</span>
        </div>
      </div>
      <div aria-label="Choose a financing term" className="tuition-terms" role="group">
        <button aria-pressed={term === 12} onClick={() => setTerm(12)} type="button">{term12Label}</button>
        <button aria-pressed={term === 18} onClick={() => setTerm(18)} type="button">{term18Label}</button>
      </div>
      <div className="tuition-result">
        <div className="tuition-payment-highlight" aria-live="polite">
          <span>{monthlyLabel} · {term} months</span>
          <strong>{currency.format(monthly)}<small>/mo</small></strong>
          <p>{downPaymentLabel}: {currency.format(downPayment)}</p>
        </div>
        <dl className="tuition-cost-breakdown">
          <div><dt>{matriculationLabel}</dt><dd>{currency.format(MATRICULATION)}</dd></div>
          <div><dt>{tuitionLabel}</dt><dd>{currency.format(tuition)}</dd></div>
          <div><dt>{booksLabel}</dt><dd>{currency.format(BOOKS)}</dd></div>
          <div><dt>{shippingLabel}</dt><dd>{currency.format(SHIPPING)}</dd></div>
          <div className="tuition-total"><dt>{totalLabel}</dt><dd>{currency.format(total)}</dd></div>
        </dl>
      </div>
      <p className="tuition-estimate-note">
        Estimated payment is rounded up to the next whole dollar. North Carolina sales tax on books is not included.
      </p>
    </div>
  );
}
