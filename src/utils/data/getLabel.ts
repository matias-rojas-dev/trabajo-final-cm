export const getLabel = (fieldName: string): string => {
  const labels: { [key: string]: string } = {
    worry: 'Nivel de Preocupación',
    belonging: 'Pertenencia',
    class: 'Clase',
    condition: 'Condición',
    family: 'Familia',
    name: 'Nombre',
    region: 'Región',
    scientificname: 'Nombre Científico',
    type: 'Tipo',
    lastsighting: 'Última Vista',
    location: 'Ubicación',
  }

  return labels[fieldName] || fieldName
}
