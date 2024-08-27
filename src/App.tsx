// Importing icon for loading state

// Github Link : https://github.com/Sudan08/react-test
import { Loader2 } from "lucide-react";
// hooks for applicaiton
import { useEffect, useState } from "react";

// Interface of data coming from Api

// In production application , I would keep all the interface in a sperate folder or file and import them depending upon cases.
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
  // State for storing data
  const [data, setData] = useState<UserData[] | null>(null);
  // This state checks if the data is loaded or not

  // Using useBoolean hook form  https://usehooks-ts.com/ would be best here
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // This is for error case if there is any error
  const [error, setError] = useState<string | null>(null);
  // This state is used to retrigger the fetch api in case error occurs on the application
  const [isRefecthing, setIsRefetching] = useState<boolean>(true);

  // This is the most simplest way for fetchin data in React application

  // In the production level, application I would use axios for the base for fetching the data, react query for caching the data and managing the state of the application

  // The react query provides all the necessary state of data fetching stages.

  // const { data , isLoading  } = useQuery({
  //   queryKey : "users",
  // the getUserData would be function that uses axios that would be defined in a separete file such as userServices.ts
  // queryFn : getUserData
  // onError : (error) => {
  //handle error state
  // }
  // })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (e) {
        // i would use a toast library to show the error message such as sonnar or react-toastify in production level application
        alert(e);
        setError(e instanceof Error ? e.message : "An unknown error occurred");
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isRefecthing]);

  return (
    <div className="flex justify-center items-center max-w-7xl mx-auto w-full h-screen bg-neutral-900">
      <div className="flex flex-col w-full justify-center items-center gap-20 overflow-hidden">
        <div className="flex flex-col gap-4">
          <h1 className="text-7xl bg-gradient-to-b from-blue-700  to-blue-100 inline-block text-transparent bg-clip-text font-bold text-center">
            Rewasoft
          </h1>
          <h3 className="text-xl text-neutral-400 text-center">
            Api call from{" "}
            <a href="https://jsonplaceholder.typicode.com/">
              Json Place Holder
            </a>
          </h3>
          <a
            href="https://github.com/Sudan08/react-test"
            target="_blank"
            className="text-center"
          >
            Github Link : https://github.com/Sudan08/react-test
          </a>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row justify-between items-center px-6">
            <h1 className="text-3xl font-semibold w-full text-center">Name</h1>
            <h1 className="text-3xl font-semibold w-full text-center">
              Location
            </h1>
            <h1 className="text-3xl font-semibold w-full text-center">
              Username
            </h1>
          </div>
          <div className="flex flex-col w-full gap-6 max-h-96 overflow-y-auto">
            {isLoading && (
              <div className="flex w-full h-96 justify-center items-center">
                <Loader2 size={64} className="animate-spin" />
              </div>
            )}
            {error && (
              <div className="flex w-full h-96 justify-center items-center flex-col gap-3">
                <h1 className="text-red-500 text-3xl font-bold">{error}</h1>
                <button
                  className="px-4 py-2 bg-white text-black rounded-md font-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsRefetching(!isRefecthing);
                  }}
                >
                  Refetch
                </button>
              </div>
            )}
            {data?.map((item) => (
              <div
                className="flex flex-row justify-between items-center px-6"
                key={item.id}
              >
                <h1 className="text-3xl font-semibold w-full text-center">
                  {item.name}
                </h1>
                <h1 className="text-3xl font-semibold w-full text-center">
                  {item.address.city}
                </h1>
                <h1 className="text-3xl font-semibold w-full text-center">
                  {item.username}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
