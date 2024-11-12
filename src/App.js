import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import routes from './routes';

function App() {
  return (
    <div className="max-w-screen-lg container mx-auto p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;