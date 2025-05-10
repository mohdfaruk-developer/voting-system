import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Create() {
  const { data, setData, post, errors } = useForm({
    name: "",
    description: "",
    level: "",
    level_name: "",
    start_on: "",
    end_on: "",
    country: "",
    state: "",
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
    switch (data.level) {
      case "country":
        // set data in country to level_name
        data.level_name = data.country;
        break;
      case "state":
        // set data in state to level_name
        data.level_name = data.state;
        break;
    }
    data.start_on = data.start_on.replace("T", " ") + ":00";
    data.end_on = data.end_on.replace("T", " ") + ":00";

    post(route("elections.store"));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create New Election
          </h2>
        </div>
      }
    >
      <Head title="Create Election" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="election_name" value="Election Name" />

                  <TextInput
                    id="election_name"
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
                    htmlFor="election_description"
                    value="Description"
                  />

                  <TextInput
                    type="text"
                    id="election_description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("description", e.target.value)}
                  />

                  <InputError message={errors.description} className="mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="election_level" value="Level" />

                  <SelectInput
                    name="level"
                    id="election_level"
                    className="mt-1 block w-full"
                    value={data.level || ""}
                    onChange={(e) => setData("level", e.target.value)}
                  >
                    <option value="">Select Level</option>
                    <option value="country">Country</option>
                    <option value="state">State</option>
                    <option value="city">City</option>
                    <option value="other">Other</option>
                  </SelectInput>

                  <InputError message={errors.level} className="mt-2" />
                </div>

                {(data.level == "" ||
                  data.level == "city" ||
                  data.level == "other") && (
                  <div className="mt-4">
                    <InputLabel
                      htmlFor="election_level_name"
                      value="Level Name"
                    />

                    <TextInput
                      id="election_level_name"
                      type="text"
                      name="level_name"
                      value={data.level_name}
                      className="mt-1 block w-full"
                      onChange={(e) => setData("level_name", e.target.value)}
                    />

                    <InputError message={errors.level_name} className="mt-2" />
                  </div>
                )}
                {(data.level == "country" || data.level == "state") && (
                  <div className="mt-4">
                    <InputLabel htmlFor="election_country" value="Country" />

                    <SelectInput
                      name="country"
                      id="election_country"
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
                  </div>
                )}
                {data.level == "state" && (
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
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <div className="mt-4">
                  <InputLabel htmlFor="election_start_on" value="Start Date" />

                  <TextInput
                    id="election_start_on"
                    type="datetime-local"
                    name="start_on"
                    value={data.start_on}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("start_on", e.target.value)}
                  />

                  <InputError message={errors.start_on} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="election_end_on" value="End Date" />

                  <TextInput
                    id="election_end_on"
                    type="datetime-local"
                    name="end_on"
                    value={data.end_on}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("end_on", e.target.value)}
                  />

                  <InputError message={errors.end_on} className="mt-2" />
                </div>
              </div>

              <div className="mt-6 text-right">
                <Link
                  href={route("elections.index")}
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
