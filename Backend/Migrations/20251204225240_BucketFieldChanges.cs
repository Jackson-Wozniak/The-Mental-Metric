using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class BucketFieldChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MinValue",
                table: "HistogramBuckets",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "MaxValue",
                table: "HistogramBuckets",
                newName: "Delta");

            migrationBuilder.RenameColumn(
                name: "HistogramBucketInterval",
                table: "GameMetrics",
                newName: "HistogramBucketDelta");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Value",
                table: "HistogramBuckets",
                newName: "MinValue");

            migrationBuilder.RenameColumn(
                name: "Delta",
                table: "HistogramBuckets",
                newName: "MaxValue");

            migrationBuilder.RenameColumn(
                name: "HistogramBucketDelta",
                table: "GameMetrics",
                newName: "HistogramBucketInterval");
        }
    }
}
