import { ApiProperty } from '@nestjs/swagger';

export class ResponseSellingDetail {
  @ApiProperty({ description: 'Jumlah produk yang dihasilkan', example: 1500 })
  jumlahProduk: number;

  @ApiProperty({
    description: 'Besar margin keuntungan dalam desimal',
    example: 0.4,
  })
  marginUntung: number;

  @ApiProperty({
    description: 'Nominal persediaan awal dalam rupiah',
    example: '2000000',
  })
  persediaanAwal: string;

  @ApiProperty({
    description: 'Nominal persediaan akhir dalam rupiah',
    example: '2000000',
  })
  persediaanAkhir: string;

  @ApiProperty({
    description: 'Nominal harga pokok produksi dalam rupiah',
    example: '2000000',
  })
  hargaPokokProduksi: string;

  @ApiProperty({
    description: 'Nominal harga pokok penjualan dalam rupiah',
    example: '2000000',
  })
  hargaPokokPenjualan: string;

  @ApiProperty({
    description: 'Nominal harga pokok penjualan per unit dalam rupiah',
    example: '2000000',
  })
  hargaPokokPenjualanPerUnit: string;

  @ApiProperty({
    description: 'Nominal keuntungan per unit dalam rupiah',
    example: '2000000',
  })
  besarKeuntungan: string;

  @ApiProperty({
    description: 'Nominal harga jual per unit dalam rupiah',
    example: '2000000',
  })
  hargaJualPerProduk: string;
}
