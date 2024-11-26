'use client';
import Image from 'next/image';

export function PasswordCard({ title, fields, buttonText, onSubmit }) {
  return (
    <div className="w-full max-w-3xl bg-orange-500/90 rounded-2xl py-16 px-12 space-y-20">
      {/* Title */}
      <div className="bg-orange-200/90 rounded-full py-3 px-6 w-fit mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-800">
          {title}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Icon Placeholder (Optional) */}
        <div className="w-40 h-40 flex-shrink-0">
          <Image 
            src="/images/logo.svg"
            alt="Icon" 
            width={160} 
            height={160} 
            className="" 
          />
        </div>

        {/* Form */}
        <form className="flex-1 w-full space-y-6" onSubmit={onSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="space-y-2">
              <label htmlFor={field.name} className="text-white text-lg">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-white/90 text-black border-0 rounded-md"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-md text-lg transition-colors"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
