import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import createApiInstance from './api.js';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ username, password }) => {
      const api = createApiInstance();
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    },
    onSuccess: (token) => {
      queryClient.invalidateQueries();
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async ({ username, password }) => {
      const api = createApiInstance();
      const response = await api.post('/auth/register', { username, password });
      return response.data;
    },
  });
};

export const usePortfoliosQuery = () => {
  const token = useSelector((state) => state.auth.token);
  return useQuery({
    queryKey: ['portfolios'],
    queryFn: async () => {
      const api = createApiInstance(token);
      const response = await api.get('/portfolios');
      return response.data;
    },
    enabled: !!token,
  });
};

export const useCreatePortfolioMutation = () => {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.token);
  return useMutation({
    mutationFn: async (name) => {
      const api = createApiInstance(token);
      const response = await api.post('/portfolios', null, { params: { name } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['portfolios']);
    },
  });
};

export const usePortfolioQuery = (portfolioId) => {
  const token = useSelector((state) => state.auth.token);
  return useQuery({
    queryKey: ['portfolio', portfolioId],
    queryFn: async () => {
      const api = createApiInstance(token);
      const response = await api.get(`/portfolios/${portfolioId}`);
      return response.data;
    },
    enabled: !!token && !!portfolioId,
  });
};

export const useInsightsQuery = (portfolioId) => {
  const token = useSelector((state) => state.auth.token);
  return useQuery({
    queryKey: ['insights', portfolioId],
    queryFn: async () => {
      const api = createApiInstance(token);
      const response = await api.get(`/portfolios/${portfolioId}/insights`);
      return response.data;
    },
    enabled: !!token && !!portfolioId,
  });
};

export const useAddAssetMutation = (portfolioId) => {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.token);
  return useMutation({
    mutationFn: async ({ ticker, quantity }) => {
      const api = createApiInstance(token);
      await api.post(`/portfolios/${portfolioId}/assets`, null, { params: { ticker, quantity } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['portfolio', portfolioId]);
      queryClient.invalidateQueries(['insights', portfolioId]);
    },
  });
};

export const useRemoveAssetMutation = (portfolioId) => {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.token);
  return useMutation({
    mutationFn: async (ticker) => {
      const api = createApiInstance(token);
      await api.delete(`/portfolios/${portfolioId}/assets/${ticker}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['portfolio', portfolioId]);
      queryClient.invalidateQueries(['insights', portfolioId]);
    },
  });
};

export const useHistoricalDataQuery = (portfolioId, ticker) => {
  const token = useSelector((state) => state.auth.token);
  return useQuery({
    queryKey: ['historical', portfolioId, ticker],
    queryFn: async () => {
      const api = createApiInstance(token);
      const response = await api.get(`/portfolios/${portfolioId}/historical/${ticker}`);
      return response.data;
    },
    enabled: !!token && !!portfolioId && !!ticker,
  });
};