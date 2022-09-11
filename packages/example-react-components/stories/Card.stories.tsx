import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card, {
  CardBody,
  CardMedia,
  CardMediaDescription,
} from '../src/lib/Card';
import { Button } from '../src/lib/Button';

export default {
  component: Card,
  title: 'Card',
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <CardBody>
      <h4>Título</h4>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <div>
        <Button type="button" variant="primary">
          Saiba mais
        </Button>
      </div>
    </CardBody>
  </Card>
);

export const Primary = Template.bind({});
Primary.args = {};
