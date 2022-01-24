import styled from "styled-components";

export const Container = styled.div`
  background: #c72828;
  padding: 2rem 1rem;

  header {
    max-width: 1280px;
    margin: 0 auto;
    padding-bottom: 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      button {
        font-weight: 600;
        border-radius: 8px;
        border: 0;
        background: #39b100;
        color: #fff;

        display: flex;
        align-items: center;

        .text {
          padding: 1rem 2rem;
        }

        .icon {
          display: flex;
          padding: 1rem;
          background: #41c900;
          border-radius: 0 8px 8px 0;
          margin: 0 auto;
        }
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      padding-bottom: 4rem;

      nav {
        width: 100%;

        button {
          width: inherit;
          margin-top: 3rem;
          margin-bottom: 1.5rem;

          .icon {
            margin: 0;
            margin-left: auto;
          }
        }
      }
    }
  }
`;
