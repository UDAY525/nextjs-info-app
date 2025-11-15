import React, { useState } from "react";

type Props = {
  initial: {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
  };
  onNext: (data: Props["initial"]) => void;
};

export default function PersonalInfo({ initial, onNext }: Props) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validateAndNext = () => {
    if (!form.fullName.trim() || form.fullName.trim().length < 3) {
      setError("Full name must be at least 3 characters.");
      return;
    }
    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!form.phone.trim()) {
      setError("Phone is required.");
      return;
    }
    if (!form.gender.trim().length) {
      setError("Gender is required");
      return;
    }
    setError(null);
    onNext(form);
  };

  return (
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="+91 98765 43210"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={validateAndNext}
          className="px-4 py-2 bg-sky-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
