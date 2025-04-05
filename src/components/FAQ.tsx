import React, { useState } from 'react';

interface FaqProps {}

const FAQ: React.FC<FaqProps> = () => {
  const [openQuestions, setOpenQuestions] = useState<Array<boolean>>([false, false, false, false]);

  const toggleQuestion = (index: number) => {
    const newOpenQuestions = [...openQuestions];
    newOpenQuestions[index] = !newOpenQuestions[index];
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-16 md:px-10 md:py-16 lg:py-24">
      <div className="mb-8 text-center md:mb-12 lg:mb-16">
        <h2 className="text-3xl font-semibold md:text-5xl">
          Frequently Asked {' '}
          <span className="bg-cover bg-center px-4 text-white bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/639156ce1c70c97aeb755c8a_Rectangle%2010%20(1).svg')]">
            Questions
          </span>
        </h2>
      </div>
      {faqData.map((item, index) => (
        <div key={index} className="mb-6 rounded-xl border border-solid border-black p-8 max-md:px-4 max-md:py-7">
          <div
            onClick={() => toggleQuestion(index)}
            className="mb-4 flex cursor-pointer items-start justify-between"
          >
            <p className="text-xl font-semibold max-md:text-lg">{item.question}</p>
            <div className="relative ml-10 flex h-8 w-8 flex-none items-center justify-center rounded-md bg-[#1353fe]">
              <div
                className={`absolute h-4 w-0.5 bg-white transition-transform ${
                  openQuestions[index] ? 'transform rotate-90' : ''
                }`}
              ></div>
              <div className="h-0.5 w-4 border border-solid border-white"></div>
            </div>
          </div>
          <p
            className="mb-4 text-[#636262]"
            style={{ display: openQuestions[index] ? 'block' : 'none' }}
          >
            {item.answer}
          </p>
        </div>
      ))}
      <p className="text-center">
        Can't find the answer you're looking for? Reach out to our{' '}
        <a href="#" className="font-bold text-[#1353fe]">
          customer support team
        </a>
        .
      </p>
    </section>
  );
};



const faqData = [
  {
    question: 'What is copy trading?',
    answer: 'Copy trading allows you to automatically replicate the trades of experienced investors. Gain from their expertise effortlessly.',
  },
  {
    question: 'What is spread in trading?',
    answer: 'Spread is the difference between the buying and selling price of an asset. It represents the broker’s fee.',
  },
  {
    question: 'How does leverage work?',
    answer: 'Leverage amplifies your trading position, allowing you to control a larger position size with a smaller capital.',
  },
  {
    question: 'What is a stop-loss order?',
    answer: 'A stop-loss order is a preset trigger to sell an asset automatically when it reaches a specific price, limiting losses.',
  }
];


export default FAQ;
