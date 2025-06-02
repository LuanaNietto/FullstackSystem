import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; // para smooth scroll em iOS
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 12px rgb(0 0 0 / 0.1);
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  background-color: #0366d6;
  color: white;
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #ddd;
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: none;
  font-size: 0.9rem;
  color: white;
  cursor: pointer;

  background-color: ${({ variant }) =>
    variant === 'delete' ? '#d64545' : variant === 'edit' ? '#2a8bda' : '#0366d6'};

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 600px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
`;