import { useEffect, useState } from "react";

export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

function App() {
  const [data, setData] = useState<UserData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="flex justify-center items-center max-w-7xl mx-auto w-full h-screen bg-neutral-900">
      <div className="flex flex-col w-full justify-center items-center gap-40 overflow-hidden">
        <h1 className="text-7xl bg-gradient-to-b from-blue-700  to-blue-100 inline-block text-transparent bg-clip-text font-bold">
          Rewasoft
        </h1>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row justify-between items-center px-6">
            <h1 className="text-3xl font-semibold">Name</h1>
            <h1 className="text-3xl font-semibold">Location</h1>
            <h1 className="text-3xl font-semibold">Action</h1>
          </div>
          <div className="flex flex-col w-full gap-6 max-h-96 overflow-y-auto">
            {data?.map((item) => (
              <div className="flex flex-row justify-between items-center px-6">
                <h1 className="text-3xl font-semibold">{item.name}</h1>
                <h1 className="text-3xl font-semibold">{item.address.city}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
