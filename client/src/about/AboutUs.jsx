import React, { useState } from 'react';

const AboutUs = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { value: '25+', label: 'Years of Experience' },
    { value: '50k+', label: 'Happy Patients' },
    { value: '12', label: 'Specialist Doctors' },
    { value: '100%', label: 'Digital Diagnostics' }
  ];

  const technologies = [
    {
      icon: 'biotech',
      title: 'AI-Driven Eye Exams',
      description: 'Using artificial intelligence to detect early signs of glaucoma and macular degeneration with 99.9% accuracy.'
    },
    {
      icon: 'hearing',
      title: 'Invisible Audiology',
      description: 'Premium hearing aids that are virtually invisible, featuring Bluetooth connectivity and AI noise cancellation.'
    },
    {
      icon: 'precision_manufacturing',
      title: 'Custom Lens Lab',
      description: 'On-site precision surfacing lab for digital freeform lenses tailored to your unique lifestyle and frames.'
    }
  ];

  const experts = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Senior Optometrist',
      specialty: 'Specializing in Pediatric Optometry & Contact Lenses.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn6g-2wskjYY_-PAJKsL_1tZpzG4JIpfI4PWholKm7TU-WPswIdR7D8ILm-kR5gohX7Lnqn_xoGg_jT3WBUOoc6xC_2KwPgb3965e-bRepwmNmA_eQ6-Gm2tUix0_Eru_UiiFHN96Irgj0ztPh77gBmkI6dGoTJq4PLj5SMpJPBp3jf0g4dsUJQv4veQyhy9xW8Asw_gwKqYzP49vGuVA0J7j3U879QqfOhfZ5E51eURAt1zUTPegezz0r9rvoqDQso-flHotHQup-'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Chief Audiologist',
      specialty: 'Expert in Digital Hearing Solutions & Tinnitus Management.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-JjtiYmo_axwK4MwCAC68NGcBYx80bOp1WhzFihbNe74akPBvKr-6fRPsEWnKGCIiFszduPU6vowMGlTqDkzuqD31DZ0VkHo37yKGM6bz-BswhlbWdoSgFEl4WVk-dnuLAIGvpZFL_KWVrHqbM9oM-TVeBuQT5gRpoKfx_gsGg_55fXvlRIgb6WiLQPk8ZNhce04d5T4YICQ3WM6us-V0oapz9VwYrHqvnT2o1bOtV07umfltQmCiQIke9xxmAF1B7yqeOkXrmoCq'
    },
    {
      name: 'Dr. Elena Rodriguez',
      role: 'Medical Director',
      specialty: 'Focused on Ocular Pathology and Advanced Diagnostics.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1XUEtRpRqkjVtEMgpKLSEt7nTpfLRehrK1yptr-41VZtl9PcaczEhJJ7pSyTE0e0Z1ObrBKKirmWeOptVnqts9fhsc-Smn-rYY1dheDWO0pZKWUrIy-1KyIbj2ga6cb4GPmgqse6rdkfgONU-vcd7IL0bUJdV0ItOanW9b5LHkmiQTWpfplY_WGTQ42s4qPJOMbiKikKxZpODO3_7DBOQWNhw9mglyfeQ5tGM_s6xbzAh6qwiaYA8AzOyjHHPlkRp59rwTx8uK5K0'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Ophthalmic Specialist',
      specialty: 'Specialist in Surgical Aftercare & Low Vision Aids.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC75jYH6uqNPr-DNwne7c3LTtGdJ_VEfCD7z1Bq6jUWIPaiV9hK8v-5PBckyivRNBLktrH2N-BWiYcxFIac_w77SUcepmfF3RIfvlCFC55azAwefJ8x3YBG0kUbmRVjd8UitX2STXByu9umh9saoDfP7ZkVe0tdYFpcPbXLGomS2rXNkkiEyWXpV9boVcKkV-WCFe1I6jWTqjwCwGU1oCTQhI7c3HrLKOI454VrDadw2A0PLBVGIJ_DlfkzQmASRj9w2Cfu8tlM7yEW'
    }
  ];

  const milestones = [
    {
      year: '1998',
      title: 'The Beginning',
      description: 'First boutique optical shop opened in the heart of the city.'
    },
    {
      year: '2005',
      title: 'Hearing Aid Wing',
      description: 'Introduced dedicated audiology services with German technology.'
    },
    {
      year: '2015',
      title: 'Digital Revolution',
      description: 'Fully digital patient records and AI diagnostic integration.'
    },
    {
      year: '2023',
      title: 'Premium Hub',
      description: 'Launched our flagship futuristic clinic and e-commerce platform.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 text-slate-800 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
        
        :root {
          --color-primary: #434DA6;
          --color-accent-pink: #FCA1E8;
          --color-accent-lavender: #EBE0FA;
          --color-accent-blue: #83C0EE;
          --color-accent-periwinkle: #BCCCF5;
        }
        
        body {
          font-family: 'Manrope', sans-serif;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(67, 77, 166, 0.1);
        }
        
        .neon-glow {
          box-shadow: 0 0 30px rgba(252, 161, 232, 0.2), 0 0 15px rgba(131, 192, 238, 0.15);
        }
        
        .neon-text-glow {
          text-shadow: 0 0 20px rgba(252, 161, 232, 0.4);
        }
        
        .gradient-primary {
          background: linear-gradient(135deg, #434DA6 0%, #83C0EE 100%);
        }
        
        .gradient-accent {
          background: linear-gradient(135deg, #FCA1E8 0%, #EBE0FA 50%, #BCCCF5 100%);
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-200/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-pink-300/30">
              <span className="material-icons">visibility</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              UPHAR <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">CLINIC</span>
            </span>
          </div>
          
          <div className="hidden md:flex gap-8 font-medium">
            <a href="#" className="hover:text-purple-600 transition-colors">Shop Eyewear</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Hearing Aids</a>
            <a href="#" className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent font-bold">About Us</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Services</a>
          </div>
          
          <button className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-xl hover:shadow-pink-300/50 transition-all">
            Book Appointment
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHkwekRjYuqzgpCkf_6rxcdb6ZpAWanwL8DsMUXotuv80SmaswQOhQCjLB6torQpPpc6K1MN7li-x5d_gl-Uyb9_7IB5Qi4aFoCouIh607N4fTBQU4hRzI8QsmWMw2WBm_L_ofH0kQoJ6nSN11gqwaBfWfal0PoWM8L8onTlxZz9HCePyJ4-ABmw0If5zdsSq9fv7kJzwBaV9P69RKi2m4qs-xO_2uYBX4DFtR2q8VJ4M5I_6KsJFSpjgOPKei9BdA0-64tmfpPxxY"
            alt="Modern Clinic Interior"
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 text-sm font-bold mb-6 tracking-widest uppercase border border-pink-200">
              Precision Vision & Sound
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Redefining the <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent neon-text-glow">Standard of Care</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              At Uphar Clinic, we merge futuristic medical technology with a personalized human touch to provide premium eyewear and advanced hearing solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-400/40 transition-all">
                Explore Our Legacy
              </button>
              <button className="bg-white border-2 border-purple-300 px-8 py-4 rounded-xl font-bold text-lg text-purple-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all">
                Watch Our Story
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl text-center neon-glow">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-sm font-semibold uppercase tracking-widest opacity-60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-3xl"></div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAD9F2EpPE35cUD_SL0gEqMfwwqGblWf7faJCVUiGX9A58I3a01nGXaArbVLSvxJUlrP08MKIyNXAboqmHyCxKwE7z__2q9Wq66kDMuGNvDamwm7vxlnbprz3ZudXhGehilQseqCt5bclD-IC0gmwVc0fr6bhz95hnFz9Ff5qM76nUhh_1EfA31OUBVbcJq3danxxYaHvndjbBsQVbdKKJ-ncLWbZ3iiv2NpUOKzCMrvqoobefOvPV3bXwPqaYtHgkaQkma7_5Py_f"
                  alt="Founding Story"
                  className="rounded-2xl shadow-2xl relative z-10 w-full h-[500px] object-cover border-2 border-purple-100"
                />
                <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-xl z-20 hidden lg:block border-l-4 border-pink-400">
                  <p className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent italic font-medium">
                    "It started with a vision to make precision eye care accessible to every household."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6">
                Our Journey <br />
                <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Legacy of Trust</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Founded in 1998, Uphar Clinic began as a small boutique optical shop with a single goal: providing exceptional vision care. Over the decades, we've evolved into a state-of-the-art diagnostic center.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We recognized early on that hearing health is as vital as vision health. This realization led to our expansion into advanced audiology, bringing the world's most sophisticated hearing aid technology to our patients.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-purple-600">verified</span>
                  <span className="font-bold">ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-pink-400">star</span>
                  <span className="font-bold">Award Winning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Technology Section */}
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-3xl p-12 md:p-20 border-2 border-purple-200/50">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">Advanced Technology Showcase</h2>
              <p className="text-slate-600">
                We invest in the latest FDA-approved diagnostic equipment to ensure your prescriptions are accurate to the micron.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-400 hover:to-blue-400 transition-all duration-500 border border-purple-100 hover:border-transparent shadow-lg hover:shadow-2xl hover:shadow-purple-300/50"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all">
                    <span className="material-icons bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent group-hover:text-white text-3xl group-hover:bg-none">
                      {tech.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{tech.title}</h3>
                  <p className="text-slate-600 group-hover:text-white/90 transition-colors">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expert Care Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Meet Our Experts</h2>
              <p className="text-slate-600 max-w-xl">
                Our team consists of world-class optometrists and senior audiologists dedicated to your long-term health.
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-purple-600 font-bold hover:gap-4 transition-all">
              View Full Team <span className="material-icons">arrow_forward</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {experts.map((expert, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 h-80 border-2 border-transparent group-hover:border-purple-300 transition-all">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/90 via-pink-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white text-sm font-medium">{expert.specialty}</p>
                  </div>
                </div>
                <h4 className="text-xl font-bold">{expert.name}</h4>
                <p className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-semibold">{expert.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20">
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Milestones of Excellence</span>
          </h2>
          
          <div className="relative border-l-2 border-purple-300 ml-4 md:ml-0 md:flex md:border-l-0 md:border-t-2 md:pt-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="mb-12 md:mb-0 md:flex-1 relative px-8">
                <div className="absolute -left-[9px] top-0 md:left-1/2 md:-top-[52px] w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 ring-8 ring-purple-100 shadow-lg shadow-purple-300/50"></div>
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-bold text-2xl mb-2">{milestone.year}</div>
                <h4 className="font-bold text-xl mb-3">{milestone.title}</h4>
                <p className="text-slate-600">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
              Experience the Future <br />of Vision and Hearing
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto relative z-10">
              Join over 50,000 satisfied patients who have found clarity and sound through our expert care.
            </p>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <button className="bg-white text-purple-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 hover:shadow-2xl transition-all">
                Book a Free Consultation
              </button>
              <button className="bg-transparent border-2 border-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:shadow-xl transition-all backdrop-blur-sm">
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-purple-50/50 to-white pt-20 pb-10 border-t border-purple-200/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded flex items-center justify-center text-white shadow-md">
                  <span className="material-icons text-sm">visibility</span>
                </div>
                <span className="text-lg font-bold tracking-tight">
                  UPHAR <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">CLINIC</span>
                </span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-6">
                Leading the way in premium eyewear and specialized hearing aid services for over two decades.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-purple-600 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500 hover:text-white transition-all hover:shadow-lg hover:shadow-purple-300/50">
                  <span className="material-icons text-lg">facebook</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-purple-600 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500 hover:text-white transition-all hover:shadow-lg hover:shadow-purple-300/50">
                  <span className="material-icons text-lg">camera_alt</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-purple-600 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500 hover:text-white transition-all hover:shadow-lg hover:shadow-purple-300/50">
                  <span className="material-icons text-lg">alternate_email</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-purple-600 transition-colors">Our Journey</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Medical Technology</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Patient Stories</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Career Opportunities</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-purple-600 transition-colors">Optical Diagnostics</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Hearing Assessment</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Premium Frames</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Digital Hearing Aids</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Clinic Info</h4>
              <ul className="space-y-4 text-slate-500">
                <li className="flex gap-3">
                  <span className="material-icons text-purple-600">location_on</span>
                  123 Health Plaza, Metro City
                </li>
                <li className="flex gap-3">
                  <span className="material-icons text-pink-400">phone</span>
                  +1 (555) 000-8888
                </li>
                <li className="flex gap-3">
                  <span className="material-icons text-blue-400">schedule</span>
                  Mon - Sat: 9am - 8pm
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-purple-200/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm">
              © 2024 Uphar Optical and Hearing Aid Clinic. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;