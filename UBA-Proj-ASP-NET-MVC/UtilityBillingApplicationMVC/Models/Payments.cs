﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace UtilityBillingApplicationMVC.Models;

public partial class Payments
{
    public int PaymentId { get; set; }

    public int UserId { get; set; }

    public int BillId { get; set; }

    public decimal PaymentAmount { get; set; }

    public DateTime PaymentDate { get; set; }

    public virtual BillHistories Bill { get; set; }

    public virtual Users User { get; set; }
}