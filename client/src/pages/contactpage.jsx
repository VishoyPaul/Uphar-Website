import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    inquiryType: 'Eyewear & Frame Consultation',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name,ldgz value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handl jnihfuhd
  eSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const b huydgirwengjrlarf]r
  
  ;kmejntih8yginjf = [
    'Eyewear & Frame Consultation',
    'Hearing Aid Technology',
    'Eye Health Examination',
    'Audiology Services',
    'Other Services'
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 font-sans text-slate-900 min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');
        
        body {
          font-family: 'Manrope', sans-serif;
        }
        
        .neon-glow {
          box-shadow: 0 0 20px rgba(252, 161, 232, 0.3), 0 0 10px rgba(131, 192, 238, 0.2);
        }
        
        .neon-border-focus:focus-within {
          box-shadow: 0 0 0 3px rgba(188, 204, 245, 0.3), 0 0 20px rgba(252, 161, 232, 0.4);
        }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(67, 77, 166, 0.15);
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Header / Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-purple-200/30 bg-white/90 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div classN bcnfhg,hkjvngcame="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center neon-glow shadow-lg">
              <span className="material-icons-round text-white text-2xl">visibility</span>
            </div>
            <span classNamecgfhyygd="text-xl font-extrabold tracking-tight">
              UPHAR<span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">.</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
            <a href="#" className="hover:text-purple-600 transition-colors">Home</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Eyewear</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Hearing Aids</a>
            <a href="#" className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent font-bold">Contact</a>
          </div>
          
          <button className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 hover:shadow-xl hover:shadow-purple-300/50 text-white px-6 py-2 rounded-full font-bold text-sm transition-all neon-glow uppercase tracking-wider">
            Book Exam
          </button>
        </nav>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div came="container mx-auto max-w-7xl">
          {/* Hero T
          
          ext */}
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              Personaliz
              
              
              ed Care
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Contact Our <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">Experts</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Experience the future of optical and auditory healthcare. Whether you need a precision eye exam or a high-tech hearing assessment, our team is here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7">
              <div classNae="glass-panel p-8 md:p-12 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        assName="material-icons-round bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">send</span>
                  Send a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <lab vmgjuel className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        classvhgkjhvnName="w-full bg-white border-2 border-purple-200 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 neon-border-focus transition-all placeholder:text-slate-400"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Email Address
                      </label>
                      <in bmvgghvput
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        classNabnhmgfnme="w-full bg-white border-2 border-purple-200 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 neon-border-focus transition-all placeholder:text-slate-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inqiryType}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-purple-200 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 neon-border-focus transition-all appearance-none text-slate-700 cursor-pointer"
                    >
                      {inquiryTypes.map((typeindex) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-white border-2 border-purple-200 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-400 neon-border-focus transition-all placeholder:text-slate-400 resize-none"
                      placeholder="How can we help you today?"
                      rows="5"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white py-4 rounded-lg font-bold uppercase tracking-[0.15em] hover:shadow-2xl hover:shadow-purple-400/50 transition-all neon-glow flex items-center justify-center gap-2 group"
                  >
                    Submit Request
                    <span className="material-icons-round text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Info & Map */}
            <div className="lg:col-span-5 space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 gap-4">
                <div className="group glass-panel p-6 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all cursor-pointer shadow-md hover:shadow-xl">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-gradient-to-br group-hover:from-pink-400 group-hover:to-purple-500 group-hover:text-white transition-all neon-glow">
                      <span className="material-icons-round">phone_iphone</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent uppercase tracking-widest mb-1">
                        Call Us Directly
                      </p>
                      <p className="text-xl font-bold">+91 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
                
                <div className="group glass-panel p-6 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all cursor-pointer shadow-md hover:shadow-xl">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-gradient-to-br group-hover:from-pink-400 group-hover:to-purple-500 group-hover:text-white transition-all neon-glow">
                      <span className="material-icons-round">alternate_email</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent uppercase tracking-widest mb-1">
                        Email Our Specialists
                      </p>
                      <p className="text-xl font-bold">care@upharoptical.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map & Address Section */}
              <div className="glass-panel p-2 rounded-xl overflow-hidden shadow-xl">
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden group">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5TNat0EfeHQsabOXN3U_OH2i96xHzECSJGqFx_CDpZHW_tfxnb8m6WLbasDXqHQ0o_CCny0isXru71VNb4LpqjTWsU-UUU6gdzAQNYyWUK4axEFdzLANSghtqnNVJVWipB5BBvg2J2aIFdHL-XtntsaNzuTc6H-u27WCtg_JFt6SzA3IzMzKmnRvDoA2E4zlZEwX5YT2Szg0MVTdzd9qWKNNsU4YCmXQMsxarHG0u9RrqhOzJ_9FGYp_6vtTBoE5pVROJ0pkh7nTO"
                    alt="Modern street map of New Delhi"
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay UI on Map */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-12 h-12 bg-pink-400 rounded-full animate-ping absolute opacity-30"></div>
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center neon-glow relative shadow-xl">
                        <span className="material-icons-round text-white">location_on</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Visit Our Clinic</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    42 Futuristic Lane, Tech Hub Plaza,<br />
                    Sector 12, South Extension, New Delhi 110049
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href="#"
                      className="text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-1 hover:underline"
                    >
                      GET DIRECTIONS <span className="material-icons-round text-xs">launch</span>
                    </a>
                    <div className="h-4 w-px bg-purple-200"></div>
                    <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> OPEN NOW
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg border-2 border-purple-200 flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500 hover:border-transparent hover:text-white transition-all hover:shadow-lg hover:shadow-purple-300/50"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.166.054 1.795.249 2.218.414.56.217.96.477 1.38.897.42.42.68.82 1.05 1.44.166.422.36.166.414 1.218.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.166-.249 1.795-.414 2.218-.217.56-.477.96-.897 1.38-.42.42-.82.68-1.44 1.05-.422.166-1.05.36-2.218.414-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.166-.054-1.795-.249-2.218-.414-.56-.217-.96-.477-1.38-.897-.42-.42-.68-.82-1.05-1.44-.166-.422-.36-.166-.414-1.218-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.166.249-1.795.414-2.218.217-.56.477-.96.897-1.38.42-.42.82-.68 1.44-1.05.422-.166 1.05-.36 2.218-.414 1.266-.058 1.646-.07 4.85-.07zM12 0c-3.259 0-3.667.014-4.947.072-1.277.057-2.148.261-2.91.558-.788.306-1.457.715-2.123 1.382-.667.666-1.076 1.335-1.382 2.123-.297.762-.501 1.633-.558 2.91-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.261 2.148.558 2.91.306.788.715 1.457 1.382 2.123.666.667 1.335 1.076 2.123 1.382.762.297 1.633.501 2.91.558 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.148-.261 2.91-.558.788-.306 1.457-.715 2.123-1.382.667-.666 1.076-1.335 1.382-2.123.297-.762.501-1.633.558-2.91.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.261-2.148-.558-2.91-.306-.788-.715-1.457-1.382-2.123-.666-.667-1.335-1.076-2.123-1.382-.762-.297-1.633-.501-2.91-.558-1.28-.058-1.688-.072-4.947-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zM18.406 4.155c.795 0 1.44.645 1.44 1.44s-.645 1.44-1.44 1.44-1.44-.645-1.44-1.44.645-1.44 1.44-1.44z" />
                  </svg>
                </a>
                
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg border-2 border-purple-200 flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500 hover:border-transparent hover:text-white transition-all hover:shadow-lg hover:shadow-purple-300/50"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg border-2 border-purple-200 flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500 hover:border-transparent hover:text-white transition-all hover:shadow-lg hover:shadow-purple-300/50"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer classNbhugtyame="border-t border-purple-200/30 bg-gradient-to-b from-white to-purple-50/30 py-12">
        <div className="container mx-auto px-6 text-center">
          <p bn bmjhjbhvyjjkhjnb vbnhjgutfry6ry7t8ty9upi[Zsdtio986]="text-slate-500 text-sm mb-4">
            © 2024 Uphar Optical and Hearing Aid Clinic. Precision Care, Redefined.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a>
            <a href="#" clashterysName="hover:text-purple-600 transition-colors">Patient Portal</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;