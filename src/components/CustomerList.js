import React from "react";

const CustomerList = ({ customers, onEditCustomers, onOpenModal }) => {
  return (
    <div className="flex flex-col justify-center overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-large dark:border-neutral-800 ">
                <tr>
                  <th
                    scope="col"
                    className="pl-6 py-3.5 pr-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-3 py-3.5 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    Channel
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-3 py-3.5 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="hidden lg:table-cell px-3 py-3.5 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Postal
                  </th>
                  <th
                    scope="col"
                    className="hidden lg:table-cell px-3 py-3.5 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="hidden lg:table-cell px-3 py-3.5 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Province
                  </th>
                  <th
                    scope="col"
                    className="hidden lg:table-cell px-3 py-3.5 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Country
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="whitespace-nowrap w-full max-w-0 sm:w-auto sm:pl-6 sm:max-w-none text-sm  pl-4 pr-3 py-4 font-medium text-gray-900 truncate">
                      {customer.name}
                      {/* //discription list element */}
                      <dl className="lg:hidden font-normal">
                        <dt className="sr-only sm:hidden truncate">email</dt>
                        <dd className="sm:hidden tm-1 text-gray-700">
                          {customer.email}
                        </dd>
                        <dt className="sr-only">city</dt>
                        <dd className="tm-1 text-gray-500 sm:text-gray-700">
                          {customer.city}
                        </dd>
                      </dl>
                    </td>
                    <td className="hidden sm:table-cell whitespace-nowrap text-sm px-3 py-4 font-medium">
                      {customer.email}
                    </td>
                    <td className=" whitespace-nowrap text-sm px-3 py-4 font-medium">
                      {customer.channel}
                    </td>
                    <td className="hidden sm:table-cell whitespace-nowrap text-sm  px-3 py-4 font-medium">
                      {customer.address}
                    </td>
                    <td className="hidden lg:table-cell whitespace-nowrap text-sm  px-3 py-4 font-medium">
                      {customer.postal}
                    </td>
                    <td className="hidden lg:table-cell whitespace-nowrap text-sm  px-3 py-4 font-medium">
                      {customer.city}
                    </td>
                    <td className="hidden lg:table-cell whitespace-nowrap text-sm  px-3 py-4 font-medium">
                      {customer.province}
                    </td>
                    <td className="hidden lg:table-cell whitespace-nowrap text-sm  px-3 py-4 font-medium">
                      {customer.country}
                    </td>
                    <td className="py-4 px-3 text-sm font-medium text-left whitespace-nowrap">
                      <div className="flex flex-row gap-2 items-center">
                        <button
                          onClick={() => {
                            onEditCustomers(customer.id);
                            onOpenModal();
                          }}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            console.info("Not yet implemented");
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
