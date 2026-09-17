import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import TuitionCalculator from './tuition-calculator';
import '../globals.css';

const reader = createReader(process.cwd(), config);

export default async function TuitionPage() {
  const entries = await reader.collections.tuition.all();
  const content = entries[0]?.entry;
  return (
    <TuitionCalculator
      content={{
        title: content?.title || 'Tuition & Program Costs',
        descriptor: content?.descriptor || 'Affordable - Transparent - Interest-Free',
        intro: content?.intro || 'A seminary-level education designed to be within reach of every called servant of God, with interest-free payments and no credit qualification required.',
        downPayment: Number.parseInt(content?.downPayment?.replace(/[^0-9]/g, '') || '375', 10),
        matriculationFee: Number.parseInt(content?.matriculationFee?.replace(/[^0-9]/g, '') || '110', 10),
        booksFee: Number.parseInt(content?.booksFee?.replace(/[^0-9]/g, '') || '250', 10),
        shippingFee: Number.parseInt(content?.shippingFee?.replace(/[^0-9]/g, '') || '15', 10),
        discount: Number.parseInt(content?.discount?.replace(/[^0-9]/g, '') || '20', 10),
      }}
    />
  );
}