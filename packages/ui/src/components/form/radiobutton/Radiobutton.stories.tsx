import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { fn } from 'storybook/test';
import Radiobutton from '.';

const meta = {
  title: 'Form/Radiobutton',
  component: Radiobutton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    opcionValida: { control: 'boolean' },
    showStatus: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Radiobutton>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultWrapper = () => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <Radiobutton
        texto="Opción 1"
        name="default-group"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.checked ? e.target.value : null)}
        id="radio-1"
      />
      <p className="text-sm text-gray-600">
        Seleccionado: {selected || 'Ninguno'} (haz click para seleccionar o deschequear)
      </p>
    </div>
  );
};

export const Default: Story = {
  args: {
    texto: '',
    id: 'radio-1',
  },
  render: () => <DefaultWrapper />,
};

const CheckedWrapper = () => {
  const [selected, setSelected] = useState<string | null>('option1');
  return (
    <div className="flex flex-col gap-4">
      <Radiobutton
        texto="Opción seleccionada"
        name="checked-group"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.checked ? e.target.value : null)}
        id="radio-2"
      />
      <p className="text-sm text-gray-600">
        Seleccionado: {selected || 'Ninguno'} (haz click para deschequear)
      </p>
    </div>
  );
};

export const Checked: Story = {
  args: {
    texto: '',
    id: 'radio-2',
  },
  render: () => <CheckedWrapper />,
};

const WithStatusCorrectWrapper = () => {
  const [selected, setSelected] = useState<string | null>('option1');
  return (
    <div className="flex flex-col gap-4">
      <Radiobutton
        texto="Opción correcta"
        opcionValida={true}
        showStatus={true}
        name="status-correct-group"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.checked ? e.target.value : null)}
        id="radio-3"
      />
      <p className="text-sm text-gray-600">
        Seleccionado: {selected || 'Ninguno'} (haz click para seleccionar o deschequear)
      </p>
    </div>
  );
};

export const WithStatusCorrect: Story = {
  args: {
    texto: '',
    id: 'radio-3',
  },
  render: () => <WithStatusCorrectWrapper />,
};

const WithStatusIncorrectWrapper = () => {
  const [selected, setSelected] = useState<string | null>('option1');
  return (
    <div className="flex flex-col gap-4">
      <Radiobutton
        texto="Opción incorrecta"
        opcionValida={false}
        showStatus={true}
        name="status-incorrect-group"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.checked ? e.target.value : null)}
        id="radio-4"
      />
      <p className="text-sm text-gray-600">
        Seleccionado: {selected || 'Ninguno'} (haz click para seleccionar o deschequear)
      </p>
    </div>
  );
};

export const WithStatusIncorrect: Story = {
  args: {
    texto: '',
    id: 'radio-4',
  },
  render: () => <WithStatusIncorrectWrapper />,
};

export const Disabled: Story = {
  args: {
    texto: 'Opción deshabilitada',
    isDisabled: true,
    name: 'radio-group',
    value: 'option1',
    id: 'radio-5',
  },
};

const InteractiveWrapper = () => {
  const [selected, setSelected] = useState<string | null>('option1');
  return (
    <div className="flex flex-col gap-4">
      <Radiobutton
        texto="Opción 1"
        name="interactive-group"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.checked ? e.target.value : null)}
        id="interactive-1"
      />
      <Radiobutton
        texto="Opción 2"
        name="interactive-group"
        value="option2"
        checked={selected === 'option2'}
        onChange={(e) => setSelected(e.target.checked ? e.target.value : null)}
        id="interactive-2"
      />
      <Radiobutton
        texto="Opción 3"
        name="interactive-group"
        value="option3"
        checked={selected === 'option3'}
        onChange={(e) => setSelected(e.target.checked ? e.target.value : null)}
        id="interactive-3"
      />
      <p className="text-sm text-gray-600 mt-2">
        Seleccionado: {selected || 'Ninguno'} (haz click en el seleccionado para deschequear)
      </p>
    </div>
  );
};

export const Interactive: Story = {
  args: {
    texto: '',
    id: 'interactive-1',
  },
  render: () => <InteractiveWrapper />,
};

const WithStatusGroupWrapper = () => {
  const [selected, setSelected] = useState<string | null>('option1');
  return (
    <div className="flex flex-col gap-4">
      <Radiobutton
        texto="Opción correcta"
        opcionValida={true}
        showStatus={true}
        name="status-group"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.checked ? e.target.value : null)}
        id="status-1"
      />
      <Radiobutton
        texto="Opción incorrecta"
        opcionValida={false}
        showStatus={true}
        name="status-group"
        value="option2"
        checked={selected === 'option2'}
        onChange={(e) => setSelected(e.target.checked ? e.target.value : null)}
        id="status-2"
      />
      <Radiobutton
        texto="Otra opción incorrecta"
        opcionValida={false}
        showStatus={true}
        name="status-group"
        value="option3"
        checked={selected === 'option3'}
        onChange={(e) => setSelected(e.target.checked ? e.target.value : null)}
        id="status-3"
      />
      <p className="text-sm text-gray-600 mt-2">
        Seleccionado: {selected || 'Ninguno'} (haz click en el seleccionado para deschequear)
      </p>
    </div>
  );
};

export const WithStatusGroup: Story = {
  args: {
    texto: '',
    id: 'status-1',
  },
  render: () => <WithStatusGroupWrapper />,
};
