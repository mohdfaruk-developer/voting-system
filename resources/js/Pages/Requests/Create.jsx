import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Create({ auth, voter }) {
  const { data, setData, post, errors, reset } = useForm({
    voter_id: voter ? voter.data.id : "",
    request_type: voter ? "exist_voter" : "new_voter",
    name: voter ? voter.data.name : auth.user.name,
    date_of_birth: voter ? voter.data.date_of_birth : "",
    aadhar_number: voter ? voter.data.aadhar_number : "",
    address: voter ? voter.data.address : "",
    city: voter ? voter.data.city : "",
    state: voter ? voter.data.state : "",
    country: voter ? voter.data.country : "",
    pin_code: voter ? voter.data.pin_code : "",
    religion: voter ? voter.data.religion : "",
    aadhar_image: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    // Fetch countries using async/await
    const fetchCountries = async () => {
      try {
        const response = await fetch(route("countries"));
        const countryData = await response.json();
        setCountries(countryData.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (data.country) {
      // Fetch states when country changes using async/await
      const fetchStates = async () => {
        try {
          const response = await fetch(
            route("states", {
              country: data.country,
            })
          );
          const stateData = await response.json();
          setStates(stateData.data);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };

      fetchStates();
    }
  }, [data.country]);

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("requests.store"));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new Request
          </h2>
        </div>
      }
    >
      <Head title="Voter Requests" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="name" value="Voter Name" />

                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />

                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel
                    htmlFor="voter_aadhar_number"
                    value="Aadhar Number"
                  />

                  <TextInput
                    type="text"
                    id="voter_aadhar_number"
                    name="aadhar_number"
                    value={data.aadhar_number}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("aadhar_number", e.target.value)}
                  />

                  <InputError message={errors.aadhar_number} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel
                    htmlFor="request_date_of_birth"
                    value="Date of Birth"
                  />

                  <TextInput
                    id="request_date_of_birth"
                    type="date"
                    name="date_of_birth"
                    value={data.date_of_birth}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("date_of_birth", e.target.value)}
                  />

                  <InputError message={errors.date_of_birth} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="Request_country" value="Country" />

                  <SelectInput
                    name="country"
                    id="Request_country"
                    className="mt-1 block w-full"
                    value={data.country || ""}
                    onChange={(e) => setData("country", e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.iso2} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </SelectInput>

                  <InputError message={errors.country} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="Request_state" value="State" />

                  <SelectInput
                    name="state"
                    id="Request_state"
                    className="mt-1 block w-full"
                    value={data.state || ""}
                    onChange={(e) => setData("state", e.target.value)}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.code} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </SelectInput>

                  <InputError message={errors.state} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="request_city" value="City" />

                  <TextInput
                    id="request_city"
                    type="text"
                    name="city"
                    value={data.city}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("city", e.target.value)}
                  />

                  <InputError message={errors.city} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="request_address" value="Address" />

                  <TextInput
                    id="request_address"
                    type="text"
                    name="address"
                    value={data.address}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("address", e.target.value)}
                  />

                  <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="request_pin_code" value="Pin Code" />

                  <TextInput
                    id="request_pin_code"
                    type="text"
                    name="pin_code"
                    value={data.pin_code}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("pin_code", e.target.value)}
                  />

                  <InputError message={errors.pin_code} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="request_religion" value="Religion" />

                  <SelectInput
                    name="religion"
                    id="request_religion"
                    className="mt-1 block w-full"
                    value={data.religion || ""}
                    onChange={(e) => setData("religion", e.target.value)}
                  >
                    <option value="">Select Religion</option>
                    <option value="hinduism">Hinduism</option>
                    <option value="islam">Islam</option>
                    <option value="christianity">Christianity</option>
                    <option value="sikhism">Sikhism</option>
                    <option value="buddhism">Buddhism</option>
                    <option value="jainism">Jainism</option>
                    <option value="judaism">Judaism</option>
                    <option value="other">other</option>
                  </SelectInput>

                  <InputError message={errors.religion} className="mt-2" />
                </div>

                <div className="mt-4 md:mt-8">
                  <InputLabel
                    htmlFor="request_aadhar_image"
                    value="Aadhar Image(max 2MB)"
                  />

                  <TextInput
                    id="request_aadhar_image"
                    type="file"
                    name="aadhar_image"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("aadhar_image", e.target.files[0])}
                  />
                  <InputError message={errors.aadhar_image} className="mt-2" />
                </div>
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("requests.index")}
                  className="mx-2 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 dark:focus:ring-offset-gray-800"
                >
                  Cancel
                </Link>
                <PrimaryButton>Submit</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
