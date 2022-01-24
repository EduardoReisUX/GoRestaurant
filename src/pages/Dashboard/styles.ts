import styled from "styled-components";

export const FoodsContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
  //margin-top: -8.75rem;
  margin-top: -8rem;

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(352px, 1fr));
  grid-gap: 32px;
`;
