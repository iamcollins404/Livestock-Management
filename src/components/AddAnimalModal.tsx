import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { LivestockType } from '../types';

interface AddAnimalModalProps {
  onClose: () => void;
  onSubmit: (values: AnimalFormValues) => void;
  breedOptions: Record<LivestockType, string[]>;
  existingAnimals: Array<{
    id: string;
    name: string;
    type: string;
    breed: string;
  }>;
}

export interface AnimalFormValues {
  type: LivestockType;
  breed: string;
  name: string;
  weight: string;
  penNumber: string;
  healthScore: number;
  parent: string;
  notes: string;
}

const validationSchema = Yup.object({
  type: Yup.string().required('Required'),
  breed: Yup.string().required('Required'),
  name: Yup.string().required('Required').min(2, 'Too Short!'),
  weight: Yup.number().required('Required').positive('Must be positive'),
  penNumber: Yup.string().required('Required'),
  healthScore: Yup.number().required('Required').min(0).max(100),
  parent: Yup.string(),
  notes: Yup.string(),
});

const initialValues: AnimalFormValues = {
  type: 'cattle',
  breed: '',
  name: '',
  weight: '',
  penNumber: '',
  healthScore: 100,
  parent: '',
  notes: '',
};

const FormField = ({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    {children}
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
);

export default function AddAnimalModal({ onClose, onSubmit, breedOptions, existingAnimals }: AddAnimalModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const baseInputStyles = `
    w-full
    px-4
    py-3
    text-base
    rounded-lg
    border-2
    border-gray-300
    focus:border-[#ff624d]
    focus:ring
    focus:ring-[#ff624d]
    focus:ring-opacity-20
    transition-colors
    duration-200
    bg-white
    shadow-sm
    hover:border-[#ff624d]
  `;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Add New Animal</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField label="Type" error={<ErrorMessage name="type" component="span" />}>
                  <Field
                    as="select"
                    name="type"
                    className={baseInputStyles}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue('type', e.target.value);
                      setFieldValue('breed', '');
                      setFieldValue('parent', '');
                    }}
                  >
                    {Object.keys(breedOptions).map((type) => (
                      <option key={type} value={type} className="capitalize">
                        {type}
                      </option>
                    ))}
                  </Field>
                </FormField>

                <FormField label="Breed" error={<ErrorMessage name="breed" component="span" />}>
                  <Field as="select" name="breed" className={baseInputStyles}>
                    <option value="">Select breed</option>
                    {breedOptions[values.type].map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </Field>
                </FormField>

                <FormField label="Name" error={<ErrorMessage name="name" component="span" />}>
                  <Field
                    type="text"
                    name="name"
                    className={baseInputStyles}
                    placeholder="Enter animal name"
                  />
                </FormField>

                <FormField label="Weight (kg)" error={<ErrorMessage name="weight" component="span" />}>
                  <Field
                    type="number"
                    name="weight"
                    className={baseInputStyles}
                    placeholder="Enter weight"
                  />
                </FormField>

                <FormField label="Pen Number" error={<ErrorMessage name="penNumber" component="span" />}>
                  <Field
                    type="text"
                    name="penNumber"
                    className={baseInputStyles}
                    placeholder="Enter pen number"
                  />
                </FormField>

                <FormField label="Health Score" error={<ErrorMessage name="healthScore" component="span" />}>
                  <div className="flex items-center space-x-4">
                    <Field
                      type="range"
                      name="healthScore"
                      className="w-full h-3 accent-[#ff624d]"
                      min="0"
                      max="100"
                    />
                    <span className="text-lg font-semibold text-[#ff624d] min-w-[3rem] text-center">
                      {values.healthScore}
                    </span>
                  </div>
                </FormField>

                <FormField label="Parent Animal" error={<ErrorMessage name="parent" component="span" />}>
                  <Field as="select" name="parent" className={baseInputStyles}>
                    <option value="">Select parent</option>
                    {existingAnimals
                      .filter(animal => animal.type === values.type)
                      .map(animal => (
                        <option key={animal.id} value={animal.id}>
                          {animal.name} ({animal.breed})
                        </option>
                      ))}
                  </Field>
                </FormField>

                <div className="md:col-span-2">
                  <FormField label="Notes" error={<ErrorMessage name="notes" component="span" />}>
                    <Field
                      as="textarea"
                      name="notes"
                      rows={4}
                      className={`${baseInputStyles} resize-none`}
                      placeholder="Enter any additional notes about the animal"
                    />
                  </FormField>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 border-2 border-gray-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 text-base font-medium text-white bg-[#ff624d] hover:bg-[#e54935] rounded-lg transition-colors disabled:opacity-50"
                >
                  Add Animal
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}