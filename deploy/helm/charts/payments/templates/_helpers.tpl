{{- define "payments.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "payments.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "payments.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}
