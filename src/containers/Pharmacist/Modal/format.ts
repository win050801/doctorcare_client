import React, { useRef, useState, useEffect, useContext } from 'react';

const formatCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
   let value = e.target.value;
   const sanitizedValue = value.replace(/[^0-9.,]/g, '');
   const numericValue = parseFloat(sanitizedValue.replace(/,/g, ''));
   return numericValue;
 };