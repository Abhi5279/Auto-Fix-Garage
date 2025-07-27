// src/components/GarageLoading.jsx

import React from "react";
import { Button, Spinner } from "flowbite-react";

const GarageLoading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-4  p-6 rounded-xl ">
        <Button color="alternative">
          <Spinner aria-label="Loading Spinner " size="sm" light />
          <span className="pl-3">Loading...</span>
        </Button>
      </div>
    </div>
  );
};

export default GarageLoading;
