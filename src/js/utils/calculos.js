function calcularSubred(ip, mask, subnetMask) {
    const ipParts = ip.split('.').map(Number);
    if (
      ipParts.length !== 4 ||
      ipParts.some((part) => isNaN(part) || part < 0 || part > 255)
    ) {
      return { error: 'Dirección IP no válida' };
    }
  
    const ipInt = ipParts.reduce((acc, part) => (acc << 8) | part, 0) >>> 0;
    const networkMask = (-1 << (32 - mask)) >>> 0;
  
    const networkInt = ipInt & networkMask;
    const broadcastInt = (networkInt) | (~networkMask) >>> 0;
  
    // Cálculo de hosts para la IP original
    const originalBroadcast = intToIp(broadcastInt);
    const originalHostMin = intToIp(networkInt + 1);
    const originalHostMax = intToIp(broadcastInt - 1);
    const totalHostsOriginal = (1 << (32 - mask)) - 2;
  
    const tipo = getIpClass(ipParts[0]);
  
    //Calcular la Wildcard
    const wildcard = intToIp(~networkMask >>> 0)
  
    // Si subnetMask es nula, devolver solo los datos originales
    if (subnetMask == null) {
      return {
        originalIp: ip,
        originalIpBinary: intToBinary(ipInt),
        mask: mask,
        maskDecimal: intToIp(networkMask),
        maskBinary: intToBinary(networkMask),
        wildcard,
        wildcardBinary: intToBinary(~networkMask >>> 0),
        originalNetwork: intToIp(networkInt),
        originalNetworkBinary: intToBinary(networkInt),
        originalBroadcast,
        originalBroadcastBinary: intToBinary(broadcastInt),
        originalHostMin,
        originalHostMinBinary: originalHostMin ? intToBinary(networkInt + 1) : null,
        originalHostMax,
        originalHostMaxBinary: originalHostMax ? intToBinary(broadcastInt - 1) : null,
        totalHostsOriginal,
        tipo,
      };
    }
  
    if (isNaN(subnetMask) || subnetMask < mask || subnetMask > 32) {
      return { error: 'Máscara de subred no válida' };
    }
  
    const subnetMaskInt = (-1 << (32 - subnetMask)) >>> 0;
  
    const totalSubnets = 1 << (subnetMask - mask);
    const hostsPerSubnet = (1 << (32 - subnetMask)) - 2;
    const subnetIncrement = hostsPerSubnet + 2;
  
    const subnets = [];
    const maxSubnetsToShow = 1000; // Máximo de subredes a mostrar
  
    // Determinar cuántas subredes mostrar en los ejemplos
    //const maxExamples = 4;
    //const showAllSubnets = totalSubnets <= maxExamples;
    //const firstSubnets = [];
    //const lastSubnets = [];
  
    for (let i = 0; i < Math.min(totalSubnets, maxSubnetsToShow); i++) {
      const subnetNetworkInt = networkInt + i * subnetIncrement;
      const subnetBroadcastInt = subnetNetworkInt + subnetIncrement - 1;
  
      const subnetRed = intToIp(subnetNetworkInt);
      const subnetBroadcast = intToIp(subnetBroadcastInt);
      const firstHost = intToIp(subnetNetworkInt + 1);
      const lastHost = intToIp(subnetBroadcastInt - 1);
  
      //const subnetData = {
        //index: i + 1,
        //red: subnetRed,
        //broadcast: subnetBroadcast,
        //rango: `${firstHost} - ${lastHost}`,
      //};
  
      subnets.push({
        index: i + 1,
        red: subnetRed,
        redBinary: intToBinary(subnetNetworkInt),
        broadcast: subnetBroadcast,
        broadcastBinary: intToBinary(subnetBroadcastInt),
        rango: `${firstHost} - ${lastHost}`,
        hostmin: firstHost,
        hostminBinary: firstHost ? intToBinary(subnetNetworkInt + 1) : null,
        hostmax: lastHost,
        hostmaxBinary: lastHost ? intToBinary(subnetBroadcastInt - 1) : null,
      });
  
      //if (showAllSubnets) {
        //subnets.push(subnetData);
      //} else {
        //if (i < maxExamples) {
          //firstSubnets.push(subnetData);
        //} else if (i >= totalSubnets - maxExamples) {
          //lastSubnets.push(subnetData);
        //}
      //}
    }
  
    //Calcular la Wildcard de la Subred
    const SubnetWildcard = intToIp(~subnetMaskInt >>> 0);
  
    // Calcular el total de hosts de todas las subredes
    const totalHostsAllSubnets = totalSubnets * hostsPerSubnet;
    
    return {
      originalIp: ip,
      originalIpBinary: intToBinary(ipInt),
      mask: mask,
      maskDecimal: intToIp(networkMask),
      maskBinary: intToBinary(networkMask),
      wildcard,
      wildcardBinary: intToBinary(~networkMask >>> 0),
      originalNetwork: intToIp(networkInt),
      originalNetworkBinary: intToBinary(networkInt),
      originalBroadcast,
      originalBroadcastBinary: intToBinary(broadcastInt),
      originalHostMin,
      originalHostMinBinary: originalHostMin ? intToBinary(networkInt + 1) : null,
      originalHostMax,
      originalHostMaxBinary: originalHostMax ? intToBinary(broadcastInt - 1) : null,
      totalHostsOriginal,
      tipo,
      subnetMask: subnetMask,
      subnetMaskDecimal: intToIp(subnetMaskInt),
      subnetMaskBinary: intToBinary(subnetMaskInt),
      SubnetWildcard,
      SubnetWildcardBinary: intToBinary(~subnetMaskInt >>> 0),
      totalSubnets,
      hostsPerSubnet,
      totalHostsAllSubnets,
      subnetIncrement,
      subnets,
      limitedSubnets: totalSubnets > maxSubnetsToShow, // Indica si se limitó la lista
    };
  }
  
  function intToIp(int) {
    return [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255,
    ].join('.');
  }
  
function intToBinary(int) {
  // Asegurar que int sea tratado como un entero sin signo (32 bits)
  return (int >>> 0)
    .toString(2)
    .padStart(32, '0')
    .match(/.{8}/g)
    .join('.');
}
  
  function getIpClass(firstOctet) {
    if (firstOctet >= 1 && firstOctet <= 126) return 'Clase A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'Clase B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'Clase C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'Clase D';
    if (firstOctet >= 240 && firstOctet <= 254) return 'Clase E';
    return 'Desconocida';
  }
  
  export default calcularSubred;
  