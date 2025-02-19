"use client"
interface CardProps {
    children: React.ReactNode;
    title: string;
  }
  
  export function Card({ children, title }: CardProps) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="p-6">{children}</div>
      </div>
    );
  }