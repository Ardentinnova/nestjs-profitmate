import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/common/prisma.service';
import { ensureFound } from 'src/common/helpers/ensure-found';
import { Transaction } from 'generated/prisma';

@Injectable()
export class TransactionService {
    constructor(private readonly prisma: PrismaService) { }
    async create(createTransactionDto: CreateTransactionDto, userId: string) {
        const { name, type, amount, periodId, expenseCategories } =
            createTransactionDto;

        return await this.prisma.$transaction(async (tx) => {
            const sum = ensureFound(
                await tx.transaction.aggregate({
                    _sum: {
                        amount: true,
                    },
                    where: {
                        userId,
                        periodId,
                    },
                }),
            );

            const inputAmount = BigInt(amount);

            const currentBalance = sum._sum.amount ?? BigInt(0);

            const endBalance = currentBalance + inputAmount;

            if (endBalance < 0n) {
                throw new BadRequestException('Saldo anda tidak mencukupi');
            }
            const newTrx = await tx.transaction.create({
                data: {
                    name,
                    amount: inputAmount,
                    type,
                    periodId,
                    userId,
                    expenseCategories,
                },
            });

            return {
                ...newTrx,
                amount: amount.toString(),
            };
        });
    }

    async findAll(periodId: string, userId: string) {
        console.log('period id' + periodId);
        console.log('user id' + userId);
        const transactions = ensureFound<Transaction[]>(
            await this.prisma.transaction.findMany({
                where: {
                    userId,
                    AND: {
                        periodId,
                    },
                },
                orderBy: {
                    createdAt: 'asc',
                },
            }),
        );

        const currentBalance = await this.prisma.transaction.aggregate({
            where: {
                userId,
                AND: {
                    periodId,
                },
            },
            _sum: {
                amount: true,
            },
        });

        const serializedTransactions =
            transactions.map((transaction) => ({
                ...transaction,
                amount: transaction.amount.toString(),
            })) ?? 0;

        return {
            currentBalance: currentBalance._sum.amount?.toString(),
            transactions: serializedTransactions,
        };
    }

    async findOne(id: string) {
        const data = ensureFound(
            await this.prisma.transaction.findUnique({
                where: {
                    id,
                },
            }),
        );

        return { ...data, amount: data.amount.toString() };
    }

    async update(id: string, updateTransactionDto: UpdateTransactionDto) {
        const { expenseCategories, description, name, amount, type } = updateTransactionDto;

        const cnvAmount = BigInt(amount!);

        const updatedTransaction = await this.prisma.transaction.update({
            where: {
                id,
            },
            data: {
                type,
                amount: cnvAmount,
                name,
                expenseCategories,
                description
            },
        });

        return {
            ...updatedTransaction,
            amount: updatedTransaction.amount.toString(),
        };
    }

    async remove(id: string) {
        const deletedTransaction = await this.prisma.transaction.delete({
            where: {
                id,
            },
        });

        return {
            ...deletedTransaction,
            amount: deletedTransaction.amount.toString(),
        };
    }
}
