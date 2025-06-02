import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgb(0 0 0 / 0.1);

  @media (max-width: 480px) {
    margin: 2rem 1rem;
    max-width: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #0366d6;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #0366d6;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #024fa2;
  }

  &:disabled {
    background-color: #a1a1a1;
    cursor: not-allowed;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;