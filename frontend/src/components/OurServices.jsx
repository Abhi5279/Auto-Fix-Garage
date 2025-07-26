// OurServices.jsx
import React from 'react';

const services = [
  { key: 'engine', title: 'Engine Issue', desc: 'Complete engine diagnostics and repairs.' },
  { key: 'battery', title: 'Battery Problem', desc: 'Battery checks, replacements & jump-starts.' },
  { key: 'brake', title: 'Brake Issue', desc: 'Brake pad, disc & fluid replacement.' },
  { key: 'service', title: 'Oil Change / Service', desc: 'Quick and efficient oil change & general service.' },
  { key: 'tire', title: 'Tire / Puncture Repair', desc: 'Flat tire fixes and new tire fittings.' },
  { key: 'electrical', title: 'Electrical Issue', desc: 'Wiring, lighting, and sensor issue fixes.' },
  { key: 'body', title: 'Body Repair / Paint', desc: 'Scratch removal, dent repairs & full paint jobs.' },
  { key: 'ac', title: 'AC/Heating Issue', desc: 'AC gas refill, cooling problems, heater fixes.' },
  { key: 'other', title: 'Other', desc: 'Anything else? We’ll fix that too!' },
];

const OurServices = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="py-16  text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.key}
              className="bg-gray-700 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-yellow-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default OurServices;
