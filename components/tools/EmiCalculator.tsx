'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, FileSpreadsheet, FileText, Plus, TrendingDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface ScheduleRow {
  month: number;
  date: Date;
  emi: number;
  interest: number;
  principal: number;
  balance: number;
  totalInterest: number;
  totalPrincipal: number;
  year: number;
  monthName: string;
}

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(1500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [loanStartDate, setLoanStartDate] = useState(new Date());
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [extraPayment, setExtraPayment] = useState(0);
  const [extraStartMonth, setExtraStartMonth] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 12;

  const formatNumber = (value: number) => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const withCurrency = (value: number) => {
    const formatted = formatNumber(value);
    return currencySymbol ? `${currencySymbol} ${formatted}` : formatted;
  };

  const calculateEMI = (p: number, r: number, t: number) => {
    if (!t || t <= 0) return 0;
    const monthlyRate = r / 12 / 100;
    return p * monthlyRate * Math.pow(1 + monthlyRate, t) / (Math.pow(1 + monthlyRate, t) - 1);
  };

  const buildSchedule = useCallback((p: number, r: number, years: number, startDate: Date, extraPerMonth: number = 0, extraFromMonth: number = 9999): ScheduleRow[] => {
    if (!p || p <= 0 || !years || years <= 0) return [];
    let balance = p;
    const monthlyRate = r / 12 / 100;
    const totalMonths = Math.floor(years * 12);
    const emi = calculateEMI(p, r, totalMonths);
    if (!emi || !isFinite(emi)) return [];
    let totalInterest = 0;
    let totalPrincipal = 0;
    const schedule: ScheduleRow[] = [];
    let currentDate = new Date(startDate);

    for (let month = 1; month <= totalMonths && balance > 0; month++) {
      const interest = balance * monthlyRate;
      let principalPaid = emi - interest;
      const applyExtra = extraPerMonth > 0 && month >= extraFromMonth;
      if (applyExtra) principalPaid += extraPerMonth;
      principalPaid = Math.min(principalPaid, balance);
      balance = Math.max(0, balance - principalPaid);
      totalInterest += interest;
      totalPrincipal += principalPaid;
      schedule.push({
        month,
        date: new Date(currentDate),
        emi: applyExtra ? emi + extraPerMonth : emi,
        interest,
        principal: principalPaid,
        balance,
        totalInterest,
        totalPrincipal,
        year: currentDate.getFullYear(),
        monthName: currentDate.toLocaleString('default', { month: 'short' })
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return schedule;
  }, []);

  const monthlyEMI = useMemo(
    () => calculateEMI(principal, interestRate, tenure * 12),
    [principal, interestRate, tenure]
  );

  const repaymentSchedule = useMemo(
    () => buildSchedule(principal, interestRate, tenure, loanStartDate),
    [principal, interestRate, tenure, loanStartDate, buildSchedule]
  );

  const scheduleWithExtra = useMemo(
    () => (extraPayment > 0 ? buildSchedule(principal, interestRate, tenure, loanStartDate, extraPayment, extraStartMonth) : null),
    [principal, interestRate, tenure, loanStartDate, extraPayment, extraStartMonth, buildSchedule]
  );

  const yearlyData = repaymentSchedule.reduce((acc: any[], entry) => {
    const yearIndex = acc.findIndex(item => item.year === entry.year);
    if (yearIndex === -1) {
      acc.push({
        year: entry.year,
        totalPrincipal: entry.principal,
        totalInterest: entry.interest,
        balance: entry.balance,
        principalRatio: entry.totalPrincipal + entry.totalInterest > 0 ? (entry.totalPrincipal / (entry.totalPrincipal + entry.totalInterest)) * 100 : 0,
        interestRatio: entry.totalPrincipal + entry.totalInterest > 0 ? (entry.totalInterest / (entry.totalPrincipal + entry.totalInterest)) * 100 : 0
      });
    } else {
      acc[yearIndex].totalPrincipal += entry.principal;
      acc[yearIndex].totalInterest += entry.interest;
      acc[yearIndex].balance = entry.balance;
      const totP = acc[yearIndex].totalPrincipal;
      const totI = acc[yearIndex].totalInterest;
      acc[yearIndex].principalRatio = totP + totI > 0 ? (totP / (totP + totI)) * 100 : 0;
      acc[yearIndex].interestRatio = totP + totI > 0 ? (totI / (totP + totI)) * 100 : 0;
    }
    return acc;
  }, [repaymentSchedule]);

  const totalAmount = repaymentSchedule[repaymentSchedule.length - 1] || { totalPrincipal: 0, totalInterest: 0 };
  const withExtraTotal = scheduleWithExtra?.[scheduleWithExtra.length - 1];
  const monthsSaved = scheduleWithExtra && withExtraTotal ? repaymentSchedule.length - scheduleWithExtra.length : 0;
  const interestSaved = scheduleWithExtra && withExtraTotal ? totalAmount.totalInterest - withExtraTotal.totalInterest : 0;

  const handleDownloadExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      const summary = [
        ['Loan Summary', ''],
        ['Principal', principal],
        ['Interest Rate (%)', interestRate],
        ['Tenure (Years)', tenure],
        ['Loan Start Date', loanStartDate.toLocaleDateString()],
        ['Monthly EMI', monthlyEMI],
        ['Total Interest', totalAmount.totalInterest],
        ['Total Amount', totalAmount.totalPrincipal + totalAmount.totalInterest],
        ['', ''],
        ...(scheduleWithExtra && withExtraTotal ? [
          ['With Extra Payment', ''],
          ['Extra Payment per Month', extraPayment],
          ['Extra From Month', extraStartMonth],
          ['New Tenure (Months)', scheduleWithExtra.length],
          ['Interest Saved', interestSaved],
          ['Time Saved (Months)', monthsSaved],
        ] : []),
      ];
      const wsSummary = XLSX.utils.aoa_to_sheet(summary);
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Loan Summary');

      const scheduleData = [
        ['Month', 'Date', 'EMI', 'Principal', 'Interest', 'Balance'],
        ...repaymentSchedule.map(row => [
          `${row.monthName} ${row.year}`,
          row.date.toLocaleDateString(),
          row.emi,
          row.principal,
          row.interest,
          row.balance,
        ]),
      ];
      const wsSchedule = XLSX.utils.aoa_to_sheet(scheduleData);
      XLSX.utils.book_append_sheet(wb, wsSchedule, 'Repayment Schedule');

      XLSX.writeFile(wb, `emi-calculator-${new Date().toISOString().slice(0, 10)}.xlsx`);
      toast.success('Excel file downloaded');
    } catch (e) {
      toast.error('Failed to download Excel');
    }
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      const sym = currencySymbol || '';
      doc.setFontSize(18);
      doc.text('EMI Calculator - Loan Summary', 14, 22);
      doc.setFontSize(10);

      const summaryRows = [
        ['Principal', `${sym} ${formatNumber(principal)}`],
        ['Interest Rate (%)', String(interestRate)],
        ['Tenure (Years)', String(tenure)],
        ['Loan Start Date', loanStartDate.toLocaleDateString()],
        ['Monthly EMI', `${sym} ${formatNumber(monthlyEMI)}`],
        ['Total Interest', `${sym} ${formatNumber(totalAmount.totalInterest)}`],
        ['Total Amount', `${sym} ${formatNumber(totalAmount.totalPrincipal + totalAmount.totalInterest)}`],
      ];
      if (scheduleWithExtra && withExtraTotal) {
        summaryRows.push(['', ''], ['With Extra Payment', ''], ['Extra per Month', `${sym} ${formatNumber(extraPayment)}`], ['Interest Saved', `${sym} ${formatNumber(interestSaved)}`], ['Time Saved (Months)', String(monthsSaved)]);
      }

      autoTable(doc, {
        startY: 28,
        head: [['Attribute', 'Value']],
        body: summaryRows,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] },
      });

      let finalY = (doc as any).lastAutoTable?.finalY ?? 28;
      doc.setFontSize(14);
      doc.text('Repayment Schedule', 14, finalY + 14);
      doc.setFontSize(10);

      const scheduleBody = repaymentSchedule.slice(0, 60).map(row => [
        `${row.monthName} ${row.year}`,
        row.date.toLocaleDateString(),
        formatNumber(row.emi),
        formatNumber(row.principal),
        formatNumber(row.interest),
        formatNumber(row.balance),
      ]);
      if (repaymentSchedule.length > 60) {
        scheduleBody.push(['...', '', '', '', '', `(${repaymentSchedule.length - 60} more rows in Excel export)`]);
      }

      autoTable(doc, {
        startY: finalY + 18,
        head: [['Month', 'Date', 'EMI', 'Principal', 'Interest', 'Balance']],
        body: scheduleBody,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] },
        styles: { fontSize: 8 },
      });

      doc.save(`emi-calculator-${new Date().toISOString().slice(0, 10)}.pdf`);
      toast.success('PDF downloaded');
    } catch (e) {
      toast.error('Failed to download PDF');
    }
  };

  const displaySchedule = scheduleWithExtra ?? repaymentSchedule;

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8">
      {/* Loan Details + Summary row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="emi-calc-card bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="emi-calc-heading text-xl font-semibold text-gray-800 mb-5">Loan Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Principal Amount</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                onWheel={(e) => e.currentTarget.blur()}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  onWheel={(e) => e.currentTarget.blur()}
                  className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (Years)</label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  onWheel={(e) => e.currentTarget.blur()}
                  className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Start Date</label>
                <input
                  type="date"
                  value={loanStartDate.toISOString().split('T')[0]}
                  onChange={(e) => setLoanStartDate(new Date(e.target.value))}
                  className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency symbol (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. $, €, £"
                  maxLength={4}
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="emi-calc-card bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="emi-calc-heading text-xl font-semibold text-gray-800 mb-5">Loan Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center space-y-4">
              <div className="emi-calc-summary-box highlight flex justify-between items-center p-4 bg-primary-50 rounded-xl border border-primary-100">
                <span className="text-gray-600 font-medium">Monthly EMI</span>
                <span className="value font-bold text-primary-700 text-lg">{withCurrency(monthlyEMI)}</span>
              </div>
              <div className="emi-calc-summary-box plain flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Total Interest</span>
                <span className="font-semibold text-gray-900">{withCurrency(totalAmount.totalInterest)}</span>
              </div>
              <div className="emi-calc-summary-box plain flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Total Amount</span>
                <span className="font-semibold text-gray-900">{withCurrency(totalAmount.totalPrincipal + totalAmount.totalInterest)}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDownloadPDF}
                  className="emi-calc-btn emi-calc-btn-pdf flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={handleDownloadExcel}
                  className="emi-calc-btn emi-calc-btn-excel flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                  Download Excel
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center min-h-[220px]">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Principal', value: principal },
                      { name: 'Interest', value: totalAmount.totalInterest }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}\n${((percent ?? 0) * 100).toFixed(1)}%`}
                    outerRadius={70}
                    dataKey="value"
                  >
                    <Cell fill="#2563eb" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                  <Tooltip formatter={(value: number | undefined) => [withCurrency(value ?? 0), '']} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Payment Simulation */}
      <div className="emi-calc-card bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="emi-calc-heading text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary-600" />
          With Extra Payment Simulation
        </h3>
        <p className="text-sm text-gray-500 mb-5">See how extra monthly payments reduce tenure and total interest.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extra payment per month</label>
            <input
              type="number"
              min={0}
              value={extraPayment}
              onChange={(e) => setExtraPayment(Math.max(0, Number(e.target.value)))}
              onWheel={(e) => e.currentTarget.blur()}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start from month</label>
            <input
              type="number"
              min={1}
              max={tenure * 12}
              value={extraStartMonth}
              onChange={(e) => setExtraStartMonth(Math.max(1, Math.min(tenure * 12, Number(e.target.value))))}
              onWheel={(e) => e.currentTarget.blur()}
              className="block w-full rounded-xl border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
            />
          </div>
        </div>
        {scheduleWithExtra && withExtraTotal && extraPayment > 0 && (
          <div className="emi-calc-extra-box flex flex-wrap gap-4 p-4 bg-primary-50 rounded-xl border border-primary-100">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700 font-medium">Interest saved:</span>
              <span className="font-bold text-primary-700">{withCurrency(interestSaved)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Time saved:</span>
              <span className="font-bold text-gray-900">{monthsSaved} months ({(monthsSaved / 12).toFixed(1)} years)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">New tenure:</span>
              <span className="font-bold text-gray-900">{scheduleWithExtra.length} months</span>
            </div>
          </div>
        )}
      </div>

      {/* Yearly Payment Analysis */}
      <div className="emi-calc-card bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="emi-calc-heading text-xl font-semibold text-gray-800 mb-4">Yearly Payment Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={yearlyData.map(entry => ({
              ...entry,
              outstandingPercent: principal > 0 ? (entry.balance / principal) * 100 : 0
            }))}
            margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="left" tickFormatter={(v) => withCurrency(v)} tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(value: number | undefined, name: string | undefined) => {
                const v = value ?? 0;
                const n = name ?? '';
                if (n === 'Principal Ratio %' || n === 'Outstanding Balance %') return [`${Number(v).toFixed(2)}%`, n];
                return [withCurrency(Number(v)), n];
              }}
              contentStyle={{ fontSize: '0.875rem' }}
            />
            <Legend wrapperStyle={{ fontSize: '0.875rem' }} />
            <Bar yAxisId="left" dataKey="totalPrincipal" name="Principal Paid" fill="#2563eb" />
            <Bar yAxisId="left" dataKey="totalInterest" name="Interest Paid" fill="#f59e0b" />
            <Line yAxisId="right" type="monotone" dataKey="principalRatio" name="Principal Ratio %" stroke="#059669" />
            <Line yAxisId="right" type="monotone" dataKey="outstandingPercent" name="Outstanding Balance %" stroke="#dc2626" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Repayment Schedule */}
      <div className="emi-calc-card bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="emi-calc-heading text-xl font-semibold text-gray-800">
            Repayment Schedule {scheduleWithExtra ? '(With Extra Payment)' : ''}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadPDF}
              className="emi-calc-btn emi-calc-btn-pdf inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={handleDownloadExcel}
              className="emi-calc-btn emi-calc-btn-excel inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="emi-calc-table min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Month</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="text-right px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">EMI</th>
                <th className="text-right px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Principal</th>
                <th className="text-right px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Interest</th>
                <th className="text-right px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Balance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displaySchedule
                .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
                .map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.monthName} {row.year}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.date.toLocaleDateString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{withCurrency(row.emi)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-green-600">{withCurrency(row.principal)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-amber-600">{withCurrency(row.interest)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600">{withCurrency(row.balance)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap justify-between items-center gap-2">
          <p className="text-sm text-gray-600">
            Showing {Math.min((currentPage - 1) * recordsPerPage + 1, displaySchedule.length)}–{Math.min(currentPage * recordsPerPage, displaySchedule.length)} of {displaySchedule.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="emi-calc-btn emi-calc-btn-primary px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-primary-700 disabled:hover:bg-primary-600"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(Math.ceil(displaySchedule.length / recordsPerPage), p + 1))}
              disabled={currentPage >= Math.ceil(displaySchedule.length / recordsPerPage)}
              className="emi-calc-btn emi-calc-btn-primary px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-primary-700 disabled:hover:bg-primary-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
