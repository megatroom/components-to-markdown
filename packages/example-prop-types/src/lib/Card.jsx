import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

//#region CardBody

const StyledBody = styled.div`
  padding: 16px;

  h6 {
    margin-top: 0;
  }
`;

/**
 * The body of the card.
 */
export const CardBody = ({ children }) => <StyledBody>{children}</StyledBody>;

CardBody.propTypes = {
  /**
   * The content of the card body.
   */
  children: PropTypes.node.isRequired,
};

//#endregion

//#region CardMedia

const StyledMedia = styled.div`
  display: flex;
  background-image: url(${(props) => props.image});
  background-position: center center;
  background-size: cover;
  height: 270px;
`;

/**
 * Add an image to the card to reinforce the content.
 */
export const CardMedia = ({ image, children }) => (
  <StyledMedia image={image}>{children}</StyledMedia>
);

CardMedia.defaultProps = {
  image: undefined,
  children: undefined,
};

CardMedia.propTypes = {
  /**
   * The image to display.
   */
  image: PropTypes.string,
  /**
   * The content of the card media.
   */
  children: PropTypes.node,
};

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

/**
 * Description to be displayed on the card media.
 *
 * @example Card with image only.
 * ```jsx
 * <Card>
 *   <CardMedia image={PlaceholderImage}>
 *     <CardMediaDescription>
 *       <h5>Image description</h5>
 *     </CardMediaDescription>
 *   </CardMedia>
 * </Card>
 * ```
 */
export const CardMediaDescription = ({ children }) => (
  <StyledMediaDescription>{children}</StyledMediaDescription>
);

CardMediaDescription.propTypes = {
  /**
   * The content of the card media description.
   */
  children: PropTypes.node.isRequired,
};

//#endregion

//#region Card

const StyledCard = styled.div`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  overflow: hidden;

  ${({ raised }) =>
    raised &&
    css`
      box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
        0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    `}
`;

/**
 * Cards are surfaces that display content and actions on a single topic.
 *
 * @remarks
 * They should be easy to scan for relevant and actionable information.
 * Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.
 *
 * @example
 * Basic usage:
 * ```jsx
 * <Card>
 *   <CardBody>
 *     <Heading>
 *       <h6>Title</h6>
 *     </Heading>
 *     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
 *     <div>
 *       <Button color="primary" variant="link">
 *         See more
 *       </Button>
 *     </div>
 *   </CardBody>
 * </Card>
 * ```
 *
 * @example
 * With media:
 * ```jsx
 * <Card>
 *   <CardMedia image={PlaceholderImage} />
 *   <CardBody>
 *     <Heading>
 *       <h6>Título</h6>
 *     </Heading>
 *     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
 *     <div>
 *       <Button color="primary" variant="link">
 *         Saiba mais
 *       </Button>
 *     </div>
 *   </CardBody>
 * </Card>
 *```
 *
 */
const Card = ({ children, raised }) => (
  <StyledCard raised={raised}>{children}</StyledCard>
);

Card.defaultProps = {
  raised: false,
};

Card.propTypes = {
  /**
   * The content of the card.
   */
  children: PropTypes.node.isRequired,
  /**
   * The elevation of the card.
   */
  raised: PropTypes.bool,
};

export default Card;

//#endregion
