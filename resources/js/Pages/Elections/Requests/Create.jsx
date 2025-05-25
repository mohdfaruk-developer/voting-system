import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Create({ auth, candidate }) {
  const candidateData = candidate ? candidate.data : null;
  const electionId = window.location.href.split("/").slice(-3)[0];

  const { data, setData, post, errors } = useForm({
    candidate_id: candidateData ? candidateData.id : "",
    request_type: candidateData ? "exist_candidate" : "new_candidate",
    name: candidateData ? candidateData.name : auth.user.name,
    description: candidateData ? candidateData.description : "",
    qualification: candidateData ? candidateData.qualification : "",
    property: candidateData ? candidateData.property : "",
    address: candidateData ? candidateData.address : "",
    city: candidateData ? candidateData.city : "",
    state: candidateData ? candidateData.state : "",
    country: candidateData ? candidateData.country : "",
    pin_code: candidateData ? candidateData.pin_code : "",
    candidate_image: "",
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
          const response = await fetch(route("states", data.country));
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

    post(route("candidate-request.store", electionId));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {candidateData
              ? "Update Candidate Request"
              : "Create Candidate Request"}
          </h2>
        </div>
      }
    >
      <Head title="Candidate Requests" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="text-gray-900 dark:text-gray-100 p-4 sm:p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="name" value="Candidate Name" />

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
                    htmlFor="candidate_description"
                    value="Bio(short description)"
                  />

                  <TextAreaInput
                    id="candidate_description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("description", e.target.value)}
                  />

                  <InputError message={errors.description} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel
                    htmlFor="candidate_qualification"
                    value="Highest Qualification"
                  />

                  <TextInput
                    id="candidate_qualification"
                    type="text"
                    name="qualification"
                    value={data.qualification}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("qualification", e.target.value)}
                  />

                  <InputError message={errors.qualification} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel
                    htmlFor="candidate_property"
                    value="Property(in INR currency)"
                  />

                  <TextInput
                    id="candidate_property"
                    type="number"
                    name="property"
                    value={data.property}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("property", e.target.value)}
                  />

                  <InputError message={errors.property} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="candidate_country" value="Country" />

                  <SelectInput
                    name="country"
                    id="candidate_country"
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
                <div className="mt-4">
                  <InputLabel htmlFor="candidate_state" value="State" />

                  <SelectInput
                    name="state"
                    id="candidate_state"
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="candidate_city" value="City" />

                  <TextInput
                    id="candidate_city"
                    type="text"
                    name="city"
                    value={data.city}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("city", e.target.value)}
                  />

                  <InputError message={errors.city} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="candidate_address" value="Address" />

                  <TextInput
                    id="candidate_address"
                    type="text"
                    name="address"
                    value={data.address}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("address", e.target.value)}
                  />

                  <InputError message={errors.address} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="candidate_pin_code" value="Pin Code" />

                  <TextInput
                    id="candidate_pin_code"
                    type="text"
                    name="pin_code"
                    value={data.pin_code}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("pin_code", e.target.value)}
                  />

                  <InputError message={errors.pin_code} className="mt-2" />
                </div>

                <div className="mt-4 md:mt-8">
                  <InputLabel
                    htmlFor="candidate_image"
                    value="Profile Image(max 2MB)"
                  />

                  <TextInput
                    id="candidate_image"
                    type="file"
                    name="candidate_image"
                    className="mt-1 block w-full"
                    onChange={(e) =>
                      setData("candidate_image", e.target.files[0])
                    }
                  />
                  <InputError
                    message={errors.candidate_image}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div></div>
                <div className="mt-4 text-right">
                  <Link
                    href={route("elections.show", electionId)}
                    className="mx-2 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 dark:focus:ring-offset-gray-800"
                  >
                    Cancel
                  </Link>
                  <PrimaryButton>Submit</PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
