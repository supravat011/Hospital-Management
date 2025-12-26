# Test Authentication Endpoints
# This script tests patient and doctor signup/login

$baseUrl = "http://localhost:5000/api"

Write-Host "`n=== Testing EHR NOW Authentication ===" -ForegroundColor Cyan

# Test 1: Patient Signup
Write-Host "`n1. Testing Patient Signup..." -ForegroundColor Yellow
$patientData = @{
    name = "Test Patient"
    age = 30
    bloodGroup = "O+"
    height = 170
    weight = 70
    mobileNumber = "9876543210"
    password = "test123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/patient/signup" -Method Post -Body $patientData -ContentType "application/json"
    Write-Host "✅ Patient Signup Successful!" -ForegroundColor Green
    Write-Host "Patient ID: $($response.data.patientId)" -ForegroundColor Green
    $patientId = $response.data.patientId
} catch {
    Write-Host "❌ Patient Signup Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Patient Login
Write-Host "`n2. Testing Patient Login..." -ForegroundColor Yellow
$loginData = @{
    identifier = "9876543210"
    password = "test123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/patient/login" -Method Post -Body $loginData -ContentType "application/json"
    Write-Host "✅ Patient Login Successful!" -ForegroundColor Green
    Write-Host "Token received: $($response.token.Substring(0, 20))..." -ForegroundColor Green
} catch {
    Write-Host "❌ Patient Login Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Doctor Signup
Write-Host "`n3. Testing Doctor Signup..." -ForegroundColor Yellow
$doctorData = @{
    name = "Dr. Test Doctor"
    age = 40
    phoneNumber = "9876543211"
    email = "testdoctor@example.com"
    medicalLicenseNumber = "MED123456"
    specialization = "General Medicine"
    hospitalName = "Test Hospital"
    hospitalAddress = "123 Test Street, Mumbai"
    password = "doctor123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/doctor/signup" -Method Post -Body $doctorData -ContentType "application/json"
    Write-Host "✅ Doctor Signup Successful!" -ForegroundColor Green
    Write-Host "Doctor ID: $($response.data.doctorId)" -ForegroundColor Green
} catch {
    Write-Host "❌ Doctor Signup Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Doctor Login
Write-Host "`n4. Testing Doctor Login..." -ForegroundColor Yellow
$doctorLoginData = @{
    identifier = "testdoctor@example.com"
    password = "doctor123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/doctor/login" -Method Post -Body $doctorLoginData -ContentType "application/json"
    Write-Host "✅ Doctor Login Successful!" -ForegroundColor Green
    Write-Host "Token received: $($response.token.Substring(0, 20))..." -ForegroundColor Green
} catch {
    Write-Host "❌ Doctor Login Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Testing Complete ===" -ForegroundColor Cyan
