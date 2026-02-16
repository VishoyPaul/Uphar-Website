import React from "react";

const Connectform = () => {
  return (
    <div className="min-h-screen  bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md mt-9 bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Booking Summary
        </h2>

        <div className="pb-5 border-b">
          <p className="text-xs tracking-widest text-gray-400 mb-3">SERVICE</p>

          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer">
              <input type="checkbox" className="accent-purple-500" />
              <div>
                <p className="font-semibold">Eye Check-up</p>
                <p className="text-sm text-gray-500">Comprehensive Screening</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer">
              <input type="checkbox" className="accent-purple-500" />
              <div>
                <p className="font-semibold">Hearing Check-up</p>
                <p className="text-sm text-gray-500">Hearing Assessment</p>
              </div>
            </label>
          </div>
        </div>

        <div className="py-5 ">
          <p className="text-xs tracking-widest text-gray-400 mb-3">
            DATE & TIME
          </p>

          <div className="space-y-3">
            <input
              type="date"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <input
              type="number"
              placeholder="Contact Number"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        <button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white text-lg font-semibold py-4 rounded-full shadow-lg transition">
          Confirm Appointment
        </button>

        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <p>✔ 100% Secure Services</p>
          <p>✔ Sanitized Equipment & Environment</p>
        </div>
      </div>

      <div className="mt-12 w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Our Address</h1>

        <div className="space-y-2 text-gray-600">
          <p className="leading-relaxed">
            S-16, Green Park Extn. N.D-16,near Green Park Metro Station,
            Lift No-2
            <br />
      
          </p>

          <p>
            Phone:
            <span className="ml-1 font-medium text-gray-800">
              9818677773 (sunny) / 921-017-7773
            </span>
          </p>

           <p className="leading-relaxed">
            Ground Floor, shop No.15 Khasra No.470,<br />
            village Kishangarh, Near d-4 Main-Road <br/>
            vasnt Kunj,South Delhi,New delhi -110070
            <br />
        

             Phone:
            <span className="ml-1 font-medium text-gray-800">
              9910524222
            </span>
          </p>



          <p>
            Email:
            <span className="ml-1 font-medium text-gray-800">
              info@uphar.com
            </span>
          </p>
        </div>

        <div className="mt-5 h-px bg-gray-100"></div>

        <p className="mt-4 text-sm text-gray-500">
          Visit us for trusted, safe & professional healthcare services.
        </p>
      </div>
    </div>
  );
};

export default Connectform;
