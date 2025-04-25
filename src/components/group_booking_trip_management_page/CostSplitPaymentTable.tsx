import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming Shadcn Checkbox
import { DollarSign, CreditCard, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the structure for a participant's cost and payment status
interface ParticipantCost {
  id: string;
  name: string;
  role?: string; // e.g., 'Group Leader'
  shareAmount: number;
  paidAmount: number;
  paymentMethod?: string;
  isPaymentConfirmed: boolean;
}

interface CostSplitPaymentTableProps {
  participants: ParticipantCost[];
  totalCost: number;
  currency?: string; // e.g., 'USD'
  onUpdatePayment: (participantId: string, paidAmount: number, paymentMethod?: string) => void;
  onConfirmPayment: (participantId: string, isConfirmed: boolean) => void;
}

const CostSplitPaymentTable: React.FC<CostSplitPaymentTableProps> = ({
  participants,
  totalCost,
  currency = '$',
  onUpdatePayment,
  onConfirmPayment,
}) => {
  const totalPaid = participants.reduce((sum, p) => sum + p.paidAmount, 0);
  const remainingBalance = totalCost - totalPaid;

  const handleAmountChange = (participantId: string, value: string) => {
    const amount = parseFloat(value) || 0;
    // Potentially find the participant and call onUpdatePayment with existing method
    const participant = participants.find(p => p.id === participantId);
    if (participant) {
       onUpdatePayment(participantId, amount, participant.paymentMethod);
    }
  };

  const handleConfirmationChange = (participantId: string, checked: boolean | 'indeterminate') => {
      if (typeof checked === 'boolean') {
          onConfirmPayment(participantId, checked);
      }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
           <DollarSign className="mr-2 h-5 w-5 text-primary" />
           Cost Split & Payments
        </CardTitle>
        <CardDescription>Manage individual shares and track payment status.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/50 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-muted-foreground">Total Trip Cost</p>
            <p className="text-xl font-semibold text-foreground">{currency}{totalCost.toFixed(2)}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
            <p className="text-xl font-semibold text-success">{currency}{totalPaid.toFixed(2)}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-muted-foreground">Remaining Balance</p>
            <p className={cn("text-xl font-semibold", remainingBalance > 0 ? "text-destructive" : "text-success")}>{currency}{remainingBalance.toFixed(2)}</p>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Participant</TableHead>
              <TableHead className="text-right">Share ({currency})</TableHead>
              <TableHead className="text-right">Paid ({currency})</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Confirm</TableHead> { /* Optional Confirm Check */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((p) => (
              <TableRow key={p.id} className="stagger-item">
                <TableCell className="font-medium">
                  {p.name}
                  {p.role && <Badge variant="secondary" className="ml-2 text-xs">{p.role}</Badge>}
                </TableCell>
                <TableCell className="text-right">{p.shareAmount.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                   {/* Simplified: Directly show paid amount. Could be an input for leader */} 
                   {p.paidAmount.toFixed(2)}
                   {/* Example Input for Leader: */}
                   {/* <Input type="number" value={p.paidAmount} onChange={(e) => handleAmountChange(p.id, e.target.value)} className="h-8 text-right max-w-[100px] inline-block"/> */} 
                </TableCell>
                <TableCell className="text-center">
                  {p.paidAmount >= p.shareAmount ? (
                    <Badge variant="success" className="text-xs">
                      <CheckCircle className="mr-1 h-3 w-3" /> Paid
                    </Badge>
                  ) : p.paidAmount > 0 ? (
                     <Badge variant="warning" className="text-xs">
                       <Clock className="mr-1 h-3 w-3" /> Partially Paid
                     </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="mr-1 h-3 w-3" /> Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                   <Checkbox
                     checked={p.isPaymentConfirmed}
                     onCheckedChange={(checked) => handleConfirmationChange(p.id, checked)}
                     aria-label={`Confirm payment for ${p.name}`}
                     className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                   />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
           <TableCaption>Summary of costs and payment status per participant.</TableCaption>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CostSplitPaymentTable;
