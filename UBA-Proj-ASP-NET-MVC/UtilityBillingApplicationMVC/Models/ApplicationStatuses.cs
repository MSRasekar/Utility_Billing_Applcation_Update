﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace UtilityBillingApplicationMVC.Models;

public partial class ApplicationStatuses
{
    public int ApplicationStatusId { get; set; }

    public int UserId { get; set; }

    public DateTime DateOfRegistration { get; set; }

    public string Status { get; set; }

    public virtual ICollection<MeterInfos> MeterInfos { get; set; } = new List<MeterInfos>();

    public virtual Users User { get; set; }
}