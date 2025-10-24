'use client';

import { Api } from '@/shared/services/api-client';
import { ColorVariant } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { useSet } from 'react-use';

type Color = Pick<ColorVariant, 'id' | 'colorName' | 'colorHex'>;

export const useColors = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchColors() {
      try {
        setLoading(true);
        const colors = await Api.colors.getAll();
        setColors(colors);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchColors();
  }, []);

  return {
    colors,
    loading,
  };
};