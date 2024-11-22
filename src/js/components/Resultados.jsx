import React from 'react';
import Styles from './resultados.module.css'

function Resultados({ data }) {
  if (data.error) {
    return (
      <div>
        <strong>Error:</strong> {data.error}
      </div>
    );
  }

  const {
    originalIp,
    originalIpBinary,
    mask,
    maskDecimal,
    maskBinary,
    wildcard,
    wildcardBinary,
    originalNetwork,
    originalNetworkBinary,
    originalBroadcast,
    originalBroadcastBinary,
    originalHostMin,
    originalHostMinBinary,
    originalHostMax,
    originalHostMaxBinary,
    totalHostsOriginal,
    tipo,
    subnetMask,
    subnetMaskDecimal,
    subnetMaskBinary,
    SubnetWildcard,
    SubnetWildcardBinary,
    totalSubnets,
    hostsPerSubnet,
    totalHostsAllSubnets,
    subnetIncrement,
    subnets,
    limitedSubnets,
  } = data;

  const hasSubnets = !!subnetMask && subnets?.length > 0; // Verifica si hay subredes calculadas

  // Limitar subredes a 1000
  const subnetsToShow = hasSubnets ? subnets.slice(0, 1000) : [];

  return (
    <div className={Styles.calculationresults}>
  <h2>Resultados del Cálculo</h2>
  <div className={Styles.card}>
    <h3>Direccionamiento ClassFull:</h3>
    <p><strong>Dirección IP:</strong> {originalIp} {originalIpBinary}</p>
    <p><strong>Máscara de Red:</strong> /{mask} ({maskDecimal}) {maskBinary}</p>
    <p><strong>Wildcard:</strong> {wildcard} {wildcardBinary}</p>
    <p><strong>Red:</strong> {originalNetwork} {originalNetworkBinary}</p>
    <p><strong>HostMin:</strong> {originalHostMin} {originalHostMinBinary}</p>
    <p><strong>HostMax:</strong> {originalHostMax} {originalHostMaxBinary}</p>
    <p><strong>Broadcast:</strong> {originalBroadcast} {originalBroadcastBinary}</p>
    <p><strong>Host por Red:</strong> {totalHostsOriginal}</p>
    <p><strong>Tipo de IP:</strong> {tipo}</p>
  </div>

  {hasSubnets && (
    <>
      <div className={Styles.card}>
        <h3>Subredes después de la transición de /{mask} a /{subnetMask}:</h3>
        <p><strong>Máscara de Subred:</strong> /{subnetMask} ({subnetMaskDecimal}) {subnetMaskBinary}</p>
        <p><strong>Wildcard:</strong> {SubnetWildcard} {SubnetWildcardBinary}</p>
        <p><strong>Salto entre Subredes:</strong> {subnetIncrement} direcciones</p>
        <p><strong>Total de Subredes:</strong> {totalSubnets} subredes</p>
        <p><strong>Hosts Totales de las Subredes:</strong> {totalHostsAllSubnets}</p>
      </div>

      <h3>Lista de Subredes:</h3>
      {limitedSubnets && (
        <p>Mostrando las primeras 1000 subredes de un total de {totalSubnets}.</p>
      )}
      {subnetsToShow.map((subnet, index) => (
        <div className={Styles.card} key={index}>
          <p><strong>Subred {subnet.index}:</strong></p>
          <p><strong>Red:</strong> {subnet.red} {subnet.redBinary}</p>
          <p><strong>HostMin:</strong> {subnet.hostmin} {subnet.hostminBinary}</p>
          <p><strong>HostMax:</strong> {subnet.hostmax} {subnet.hostmaxBinary}</p>
          <p><strong>Broadcast:</strong> {subnet.broadcast} {subnet.broadcastBinary}</p>
          <p><strong>Hosts por Subred:</strong> {hostsPerSubnet}</p>
          <p><strong>Tipo de IP:</strong> {tipo}</p>
        </div>
      ))}
    </>
  )}

  {!hasSubnets && (
    <p className={Styles.no-subnets}>No se calcularon subredes porque no se proporcionó una máscara de subred o no es válida.</p>
  )}
</div>

  );
}

export default Resultados;