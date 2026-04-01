import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function UserForm() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [umur, setUmur] = useState("");
  const [gender, setGender] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!nama) newErrors.nama = "Nama wajib diisi";
    else if (!isNaN(nama)) newErrors.nama = "Nama tidak boleh angka";

    if (!email) newErrors.email = "Email wajib diisi";
    else if (!email.includes("@")) newErrors.email = "Email tidak valid";

    if (!umur) newErrors.umur = "Umur wajib diisi";
    else if (isNaN(umur)) newErrors.umur = "Umur harus angka";

    if (!gender) newErrors.gender = "Pilih gender";
    if (!pekerjaan) newErrors.pekerjaan = "Pilih pekerjaan";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          Form Data User
        </h2>

        <InputField
          label="Nama"
          placeholder="Masukkan nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          error={errors.nama}
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <InputField
          label="Umur"
          placeholder="Masukkan umur"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
          error={errors.umur}
        />

        <SelectField
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={["Laki-laki", "Perempuan"]}
          error={errors.gender}
        />

        <SelectField
          label="Pekerjaan"
          value={pekerjaan}
          onChange={(e) => setPekerjaan(e.target.value)}
          options={["Mahasiswa", "Karyawan", "Freelancer"]}
          error={errors.pekerjaan}
        />

        <button
          onClick={validate}
          className="w-full bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-600"
        >
          Submit
        </button>

        {isValid && (
          <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500">
            <p><b>Nama:</b> {nama}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Umur:</b> {umur}</p>
            <p><b>Gender:</b> {gender}</p>
            <p><b>Pekerjaan:</b> {pekerjaan}</p>
          </div>
        )}
      </div>
    </div>
  );
}