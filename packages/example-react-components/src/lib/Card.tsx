import styled from 'styled-components';

//#region CardBody

const StyledBody = styled.div`
  padding: 16px;

  h6 {
    margin-top: 0;
  }
`;

interface CardBodyProps {
  children: React.ReactNode;
}

export const CardBody = ({ children }: CardBodyProps) => (
  <StyledBody>{children}</StyledBody>
);

//#endregion

//#region CardMedia

interface StyleMediaProps {
  image: string;
}

const StyledMedia = styled.div`
  display: flex;
  background-image: url(${(props: StyleMediaProps) => props.image});
  background-position: center center;
  background-size: cover;
  height: 270px;
`;

interface CardMediaProps {
  image: string;
  children: React.ReactNode;
}

export const CardMedia = ({ image, children }: CardMediaProps) => (
  <StyledMedia image={image}>{children}</StyledMedia>
);

//#endregion

//#region CardMediaDescription

const StyledMediaDescription = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  padding: 8px 16px;
  color: #fff;
  align-self: flex-end;
  flex: 1;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
`;

interface CardMediaDescriptionProps {
  children: React.ReactNode;
}

export const CardMediaDescription = ({
  children,
}: CardMediaDescriptionProps) => (
  <StyledMediaDescription>{children}</StyledMediaDescription>
);

//#endregion

//#region Card

const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
  overflow: hidden;
`;

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => <StyledCard>{children}</StyledCard>;

export default Card;

//#endregion
