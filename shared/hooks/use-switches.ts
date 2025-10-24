// hooks/use-switches.ts
'use client';

import { Api } from '@/shared/services/api-client';
import { Switch } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { useSet } from 'react-use';

export const useSwitches = () => {
  const [switches, setSwitches] = useState<Switch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSwitches() {
      try {
        setLoading(true);
        const switches = await Api.switches.getAll();
        setSwitches(switches);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchSwitches();
  }, []);

  return {
    switches,
    loading,
  };
};